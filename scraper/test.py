
# from frontend.models import Fonte
from arauto import tweeze_get_sources_db
from scraper import neus_scraper
import threading

data = tweeze_get_sources_db()
# print(data[0])
# neus_scraper(dict(data[0]))
# print(data[0])
# def bridge_control(sources):
# for i, s in enumerate(data):
#     print(i)

# bridge_control(data)
# e2 = dict(
#     url_global="http://rss.uol.com.br/feed/noticias.xml",
#     news_container="item",
#     news_url='link',
#     news_source="UOL",
#     news_title="title",
#     news_date="pubDate",
#     news_description="description",
#     source_slug="UOL",
#     initial_timer=15)
t2 = threading.Thread(target=neus_scraper, kwargs=dict(data[1]))
t2.name = "G1"
t2.start()
# print(t2)
