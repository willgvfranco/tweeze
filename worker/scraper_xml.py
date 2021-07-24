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
import re


def xml_scraper(source_url_global, news_source, source_slug, id,
                source_initial_timer=15, *args, **kwargs):

    timer = source_initial_timer
    cachero_list_etags = source_slug.lower() + "_etag_cache-" + str(id)
    cachero_list_individual_hashes = source_slug.lower() + "_hash_cache-" + str(id)

    while True:
        count = 0
        timer = int(timer * round(random.uniform(1,1.4),3))

        try:
            response = feedparser.parse(source_url_global)
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

        if timer > 7200:
            timer = 5400
        data = json.dumps(response.entries)
        # if response.etag:
        #     m = re.search('W/"(.+?)\"',response.etag)
        #     etag = m.group(1)
        #     etag_encode = etag.encode('utf-8')
        # else:
        etag = generate_hash(data, 'str').encode('utf-8')
        etag_encode = etag

        etag_cache = Cachero.listrange(cachero_list_etags, 0, -1)
        hash_cache = Cachero.listrange(cachero_list_individual_hashes, 0, -1)
        article_list = []

        if etag_encode not in etag_cache:

            for news in response['entries']:
                individual_url = news['link']

                hash_news = generate_hash(
                    individual_url, 'str').encode('utf-8')

                if hash_news in hash_cache:
                    continue

                else:
                    count += 1
                    Cachero.listpush(cachero_list_individual_hashes, hash_news)

                    description = ""
                    if 'summary' in news:
                        description = html_clear(news['summary'])

                    article_list.append({
                        'title': news['title'] if 'title' in news else '',
                        'url': news['link'],
                        'description': description,
                        "pub_data": news['published_parsed'] if 'published_parsed' in news else date.today().strftime('%d/%m/%Y'),
                        "source": news_source,
                        "fonte_id": id
                    })
            # return article_list
            if article_list:
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