from datetime import date

import feedparser
from bs4 import BeautifulSoup
import re
import requests
from goose3 import Goose

from arauto import tweeze_store_db, Cachero, generate_hash
from time import sleep
import json
from utils import html_clear


def xml_scraper(source_url_global, news_source, source_slug, id,
                source_initial_timer=15, *args, **kwargs):
    timer = source_initial_timer
    cachero_list_etags = source_slug.lower() + "_etag_cache-" + str(id)
    cachero_list_individual_hashes = source_slug.lower() + "_hash_cache-" + str(id)

    while True:
        count = 0
        if timer > 5400:
            timer = 5400

        response = feedparser.parse(source_url_global)
        data = json.dumps(response.entries)

        etag = generate_hash(data.encode('utf-8'))
        etag_encode = etag
        etag_cache = Cachero.listrange(cachero_list_etags, 0, -1)
        hash_cache = Cachero.listrange(cachero_list_individual_hashes, 0, -1)
        article_list = []

        if etag_encode not in etag_cache:

            for news in response['entries']:
                individual_url = news['link']

                hash_news = generate_hash(individual_url, 'str').encode('utf-8')

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
                Cachero.listpush(cachero_list_etags, etag)

                Cachero.listtrim(cachero_list_etags, 0, 7)
                Cachero.listtrim(cachero_list_individual_hashes, 0, 511)
                sleep(timer)

            else:
                timer = int(timer * 1.2)
                print(f"{source_slug}: No updates available, sleeping for {timer}s")
                sleep(timer)

        else:
            timer = int(timer * 1.2)
            print(f"{source_slug}: No updates available, sleeping for {timer}s")
            sleep(timer)


def html_scraper(source_url_global, news_container, news_url, news_source, source_slug, id, source_initial_timer=15, news_regex=None, *args, **kwargs):

    timer = source_initial_timer
    cachero_list_etags = source_slug.lower() + "_etag_cache-" + str(id)
    cachero_list_individual_hashes = source_slug.lower() + "_hash_cache-" + str(id)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
    }

    while True:
        count = 0
        if timer > 5400:
            timer = 5400
        response = requests.get(source_url_global, headers=headers)
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

                if not isinstance(urls_list, list):
                    return scrap_one(urls_list)

                with Goose() as g:

                    for tmp in urls_list:
                        art = g.extract(url=tmp)
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
                Cachero.listpush(cachero_list_etags, etag)

                Cachero.listtrim(cachero_list_etags, 0, 7)
                Cachero.listtrim(cachero_list_individual_hashes, 0, 511)
                sleep(timer)

            else:
                timer = int(timer * 1.2)
                print(f"{source_slug}: No updates available, sleeping for {timer}s")
                sleep(timer)

        else:
            timer = int(timer * 1.2)
            print(f"{source_slug}: No updates available, sleeping for {timer}s")
            sleep(timer)
    # urls_list = html_scraper(global_url, news_container, news_url, news_regex)


def scrap_one(urls_list):
    g = Goose()
    art = g.extract(urls_list)
    news = {
        "title": art.title,
        "link": art.final_url,
        "description": art.cleaned_text,
        "data": art.publish_datetime_utc
    }
    return news


def scrap_them_all(urls_list, news_source, id):
    article_list = []

    if not isinstance(urls_list, list):
        return scrap_one(urls_list)

    with Goose() as g:

        for tmp in urls_list:
            art = g.extract(url=tmp)
            # print(article.cleaned_text)
            noticia_final = ({
                "title": art.title,
                "link": art.final_url,
                "description": art.cleaned_text if 'description' in art else '',
                "pub_data": art.publish_datetime_utc  if 'publish_datetime_utc' in art else date.today().strftime('%d/%m/%Y')
            })
            article_list.append(noticia_final)

    return article_list
