from bs4 import BeautifulSoup
import re
import requests
from arauto import tweeze_store_db, Cachero, generate_hash
from time import sleep
import json
from datetime import date


def neus_scraper(source_url_global, news_container, source_type, news_url, news_source, news_title, news_date, news_description, source_slug, id, news_category=None, source_initial_timer=15, *args, **kwargs):

    timer = source_initial_timer
    cachero_list_etags = source_slug.lower() + "_etag_cache-" + str(id)
    cachero_list_individual_hashs = source_slug.lower() + "_hash_cache-" + str(id)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
    }
    while True:
        count = 0
        if (timer > 5400):
            timer = 5400

        response = requests.get(source_url_global, headers=headers)
        data = response.content
        if(source_type == "XML"):
            soup = BeautifulSoup(data, features="xml",
                                 from_encoding='utf-8')
        else:
            soup = BeautifulSoup(data, 'html.parser',
                                 from_encoding='utf-8')

        etag = generate_hash(data)
        etag_encode = etag.encode('utf-8')

        # Listas Cache
        etag_cache = Cachero.listrange(cachero_list_etags, 0, -1)
        hash_cache = Cachero.listrange(cachero_list_individual_hashs, 0, -1)

        if(etag_encode not in etag_cache):
            # if(True):

            # Find all text in the data

            # Find the tag/child
            if(news_container.startswith('re=')):
                container = soup.findAll(href=re.compile(
                    news_container.removeprefix('re=')))
            elif('.' in news_container):
                formatted_container = news_container.split(".")
                container = soup.findAll(
                    formatted_container[0], class_=formatted_container[1])
            else:
                container = soup.findAll(news_container)

            processed_data = []

            for news in container:

                md_url = news.select_one(news_url)

                if(not md_url):
                    url = news.attrs['href']
                elif("href" in md_url.attrs):
                    url = md_url.attrs['href']
                else:
                    url = news.find(news_url).text
                hash_news = generate_hash(url, 'str').encode('utf-8')

                if(hash_news in hash_cache):

                    continue
                else:
                    count += 1
                    Cachero.listpush(cachero_list_individual_hashs, hash_news)

                    if(source_type == "XML"):
                        titulo = news.find(news_title).text
                    else:
                        titulo = news.select_one(news_title).text
                        if not titulo:
                            continue

                    has_category = news.find(news_category)
                    if(has_category):
                        category = news.find(news_category).text
                    else:
                        category = ''

                    has_data = news.find(news_date)
                    if(has_data):
                        pub_data = has_data.text
                    else:
                        pub_data = date.today().strftime('%d/%m/%Y')

                    descricao = news.find(news_description)
                    if(descricao):
                        descricao = news.find(news_description).text
                    else:
                        descricao = ''

                    formatted_pergunta = {
                        'source': news_source,
                        'title': titulo,
                        'fonte_id': str(id),
                        'url': url,
                        'description': descricao,
                        'pub_data': pub_data,
                        'category': category,

                    }

                    processed_data.append(formatted_pergunta)

            if(processed_data):
                timer = source_initial_timer
                tweeze_store_db(processed_data, source_slug, count, timer)
                Cachero.listpush(cachero_list_etags, etag)

                Cachero.listtrim(cachero_list_etags, 0, 7)
                Cachero.listtrim(cachero_list_individual_hashs, 0, 1023)
                sleep(timer)

            else:
                timer = int(timer * 1.2)
                print(f"{source_slug}: No updates available, sleeping for {timer}s")
                sleep(timer)

        else:
            timer = int(timer * 1.2)
            print(f"{source_slug}: No updates available, sleeping for {timer}s")
            sleep(timer)
