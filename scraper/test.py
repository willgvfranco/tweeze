
# from frontend.models import Fonte
from arauto import tweeze_get_sources_db

data = tweeze_get_sources_db()
print(data)
# def bridge_control(sources):
for i, s in enumerate(data):
    print(i)

# bridge_control(data)
t2 = dict(
    url_global="http://rss.uol.com.br/feed/noticias.xml",
    news_container="item",
    news_url='link',
    news_source="UOL",
    news_title="title",
    news_date="pubDate",
    news_description="description",
    slug="UOL",
    initial_timer=15)


# print(t2)
# print(t2)
