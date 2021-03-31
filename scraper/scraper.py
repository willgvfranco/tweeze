from bs4 import BeautifulSoup
import re
import requests
from arauto import tweeze_store_db, Cachero, generate_hash
from time import sleep
import json
from datetime import date


def neus_scraper(source_url_global, news_container, news_url, news_source, news_title, news_date, news_description, source_slug, id, news_category=None, initial_timer=15, *args, **kwargs):

    timer = initial_timer
    cachero_list_etags = source_slug.lower() + "_etag_cache"
    cachero_list_individual_hashs = source_slug.lower() + "_hash_cache"
    while True:
        count = 0
        if (timer > 5400):
            timer = 5400
        # Data
        # with open(source_url_global, "r") as f:
        #     response = f.read()
        response = requests.get(source_url_global)
        xml_data = response.content
        soup = BeautifulSoup(xml_data, features="xml", from_encoding='utf-8')
        # texts = str(soup.findAll(text=True)).replace('\\n', '')

        # if(regex_temp):
        #     xml_data.replace(regex_temp, '')

        # Validation
        # etag = response.headers._store['etag'][1]
        etag = generate_hash(xml_data)
        etag_encode = etag.encode('utf-8')

        # Listas Cache
        etag_cache = Cachero.listrange(cachero_list_etags, 0, -1)
        hash_cache = Cachero.listrange(cachero_list_individual_hashs, 0, -1)

        # if(etag_encode not in etag_cache):
        if(True):

            # Find all text in the data

            # Find the tag/child
            container = soup.findAll(news_container)
            processed_data = []

            for news in container:
                if('/href' in news_url):
                    news_url_formmated = news_url[:-5]
                    url = news.find(news_url_formmated)['href']
                else:
                    url = news.find(news_url).text

                hash_news = generate_hash(url, 'str').encode('utf-8')

                if(hash_news in hash_cache):

                    continue
                else:
                    count += 1
                    Cachero.listpush(cachero_list_individual_hashs, hash_news)

                    titulo = news.find(news_title).text

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

                    descricao = news.find(news_description).text

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
                timer = 15
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
