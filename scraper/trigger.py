from scraper import neus_scraper
import threading
import time

# neus_scraper(
#     url_global="https://g1.globo.com/rss/g1/",
#     news_container="item",
#     news_url='guid',
#     news_source="G1",
#     news_title="title",
#     news_date="pubDate",
#     news_description="description",
#     slug="G1",
#     initial_timer=15)


# neus_scraper(
#     url_global="http://rss.uol.com.br/feed/noticias.xml",
#     news_container="item",
#     news_url='link',
#     news_source="UOL",
#     news_title="title",
#     news_date="pubDate",
#     news_description="description",
#     slug="uol",
#     initial_timer=15)


t1 = threading.Thread(target=neus_scraper, kwargs=dict(
    url_global="https://g1.globo.com/rss/g1/",
    news_container="item",
    news_url='guid',
    news_source="G1",
    news_title="title",
    news_date="pubDate",
    news_description="description",
    slug="G1",
    initial_timer=15))

t2 = threading.Thread(target=neus_scraper, kwargs=dict(
    url_global="http://rss.uol.com.br/feed/noticias.xml",
    news_container="item",
    news_url='link',
    news_source="UOL",
    news_title="title",
    news_date="pubDate",
    news_description="description",
    slug="UOL",
    initial_timer=15))

t1.name = 'G1'
# t1.daemon = True
t2.name = 'UOL'
# t2.daemon = True

t1.start()
t2.start()


# while True:
#     time.sleep(1)
