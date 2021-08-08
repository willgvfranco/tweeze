from datetime import date
import random
import feedparser
from bs4 import BeautifulSoup
import re
import requests
from goose3 import Goose

from arauto import tweeze_store_db, Cachero, generate_hash
from time import sleep
import json
from utils import html_clear


def html_scraper(source_url_global, news_container, news_url, news_source, source_slug, id, source_initial_timer=60, news_regex=None, *args, **kwargs):

    timer = source_initial_timer
    cachero_list_etags = source_slug.lower() + "_etag_cache-" + str(id)
    cachero_list_individual_hashes = source_slug.lower() + "_hash_cache-" + str(id)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
    }

    while True:
        count = 0
        timer = int(timer * round(random.uniform(1,1.4),3))

        try:
            response = requests.get(source_url_global, headers=headers)
        except:
            print(f'[REQUEST] -- {source_slug} IS FUCKING DEAD = REQUEST')
            Cachero.listpush('postmortens_request', source_slug)
            if timer < 300:
                timer = 300
            if timer > 10800:
                Cachero.listpush('postmortens_definitive', source_slug)
                break
            timer = int(timer * 1.4)
            print(f"{id}:{source_slug}: [ERROR] sleeping for {timer}s")
            sleep(timer)
            continue

        if timer > 5400:
            timer = 5400

        soup = BeautifulSoup(response.content, 'html5lib',
                             from_encoding='utf-8')

        data = response.content

        etag = generate_hash(data)
        etag_encode = etag.encode('utf-8')

        # -------------- REDIS VERIFY --------------
        etag = generate_hash(data)
        etag_encode = etag.encode('utf-8')
        etag_cache = Cachero.listrange(cachero_list_etags, 0, -1)
        hash_cache = Cachero.listrange(cachero_list_individual_hashes, 0, -1)

        if etag_encode not in etag_cache:
            urls_list = []

            if news_container.startswith('re='):
                container = soup.findAll(href=re.compile(
                    news_container.removeprefix('re=')))
            elif '.' in news_container:
                formatted_container = news_container.split(".")
                container = soup.findAll(
                    formatted_container[0], class_=formatted_container[1])
            else:
                container = soup.findAll(news_container)

            new_container = []
            for news in container:
                multiple_container = news.findAll('a')
                if multiple_container:
                    for child in multiple_container:
                        new_container.append(child)

            if new_container:
                container = new_container

            for news in container:
                md_url = news.select_one(news_url)
                if not md_url:
                    if 'href' in news.attrs:
                        fn_url = news.attrs['href']
                    else:
                        continue
                else:
                    fn_url = md_url['href']
                    if 'javascript' in fn_url:
                        continue

                if news_regex:
                    fn_url = news_regex + fn_url

                if '¬' in fn_url:
                    fn_url = fn_url.replace("¬", "&not", 1)

                hash_news = generate_hash(fn_url, 'str').encode('utf-8')

                if hash_news in hash_cache:

                    continue
                else:
                    count += 1
                    Cachero.listpush(cachero_list_individual_hashes, hash_news)
                    urls_list.append(fn_url)

            if urls_list:

                article_list = []

                # if not isinstance(urls_list, list):
                #     return scrap_one(urls_list)

                with Goose() as g:

                    for tmp in urls_list:
                        try:
                            art = g.extract(url=tmp)
                        except:
                            continue
                        
                        # print(article.cleaned_text)
                        noticia_final = {
                            "title": art.title,
                            "url": art.final_url,
                            "description": art.cleaned_text,
                            "pub_data": art.publish_datetime_utc,
                            "source": news_source,
                            "fonte_id": id
                        }
                        article_list.append(noticia_final)

                timer = source_initial_timer
                tweeze_store_db(article_list, source_slug, count, timer)
                Cachero.listpush(cachero_list_etags, etag_encode)

                Cachero.listtrim(cachero_list_etags, 0, 7)
                Cachero.listtrim(cachero_list_individual_hashes, 0, 511)
                sleep(timer)

            else:
                timer = int(timer * 1.2)
                print(f"{id}:{source_slug}: [IND] No updates available, sleeping for {timer}s")
                Cachero.listpush(cachero_list_etags, etag_encode)

                sleep(timer)

        else:
            timer = int(timer * 1.4)
            print(f"{id}:{source_slug}: [ALL] No updates available, sleeping for {timer}s")
            sleep(timer)
