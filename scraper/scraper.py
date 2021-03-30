from bs4 import BeautifulSoup
import re
import requests
from arauto import tweeze_store_db, Cachero, generate_hash
from time import sleep
import json
from datetime import date


def neus_scraper(url_global, news_container, news_url, news_source, news_title, news_date, news_description, slug, regex_temp=None, initial_timer=15):

    timer = initial_timer
    cachero_list_etags = slug.lower() + "_etag_cache"
    cachero_list_individual_hashs = slug.lower() + "_hash_cache"
    while True:
        count = 0
        if (timer > 3600):
            timer = 3600
        # Data
        # with open(url_global, "r") as f:
        #     response = f.read()
        response = requests.get(url_global)
        xml_data = response.content
        soup = BeautifulSoup(xml_data, features="xml", from_encoding='utf-8')
        # texts = str(soup.findAll(text=True)).replace('\\n', '')

        if(regex_temp):
            xml_data.replace(regex_temp, '')

        # Validation
        # etag = response.headers._store['etag'][1]
        etag = generate_hash(xml_data)
        etag_encode = etag.encode('utf-8')

        # Listas Cache
        etag_cache = Cachero.listrange(cachero_list_etags, 0, -1)
        hash_cache = Cachero.listrange(cachero_list_individual_hashs, 0, -1)

        if(etag_encode not in etag_cache):

            # Find all text in the data

            # Find the tag/child
            container = soup.findAll(news_container)
            processed_data = []

            for news in container:
                url = news.find(news_url).text
                hash_news = generate_hash(url, 'str').encode('utf-8')

                if(hash_news in hash_cache):

                    continue
                else:
                    count += 1
                    Cachero.listpush(cachero_list_individual_hashs, hash_news)
                    fonte = news_source
                    titulo = news.find(news_title).text

                    has_data = news.find(news_date)
                    if(has_data):
                        pub_data = has_data.text
                    else:
                        pub_data = date.today().strftime('%d/%m/%Y')
                    descricao = news.find(news_description).text

                    formatted_pergunta = {
                        'fonte': fonte,
                        'titulo': titulo,
                        'url': url,
                        'descricao': descricao,
                        'pub_data': pub_data

                    }

                    processed_data.append(formatted_pergunta)

            if(processed_data):
                timer = 15
                tweeze_store_db(processed_data, slug, count, timer)
                Cachero.listpush(cachero_list_etags, etag)
                Cachero.listtrim(cachero_list_etags, 0, 7)
                Cachero.listtrim(cachero_list_individual_hashs, 0, 255)
                sleep(timer)

            else:
                timer = int(timer * 1.2)
                print(f"{slug}: No updates available, sleeping for {timer}s")
                sleep(timer)

        else:
            timer = int(timer * 1.2)
            print(f"{slug}: No updates available, sleeping for {timer}s")
            sleep(timer)
