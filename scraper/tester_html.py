import requests
from bs4 import BeautifulSoup
from arauto import tweeze_get_sources_db
# conn = psycopg2.connect(dsn)
from datetime import date
import re


source_url_global = "http://www.jreporterdoaraguaia.com/"
news_container = "re=Publicacao"
news_description = 'h2'
news_pubdate = 'span.tpl-list-datedesc'
news_url = 'a'
news_title = 'h2'


response = requests.get(source_url_global)
html_data = response.content
soup = BeautifulSoup(html_data, 'html.parser', from_encoding='utf-8')


if(news_container.startswith('re=')):
    container = soup.findAll(href=re.compile(
        news_container.removeprefix('re=')))
elif('.' in news_container):
    formatted_container = news_container.split(".")
    container = soup.findAll(
        formatted_container[0], class_=formatted_container[1])
else:
    container = news_container

    # container = soup.findAll(
    #     "a", attrs={"href": "Publicacao"})
processed_data = []


# news_date = models.CharField(max_length=255, blank=True, null=True)
# news_description = models.CharField(max_length=255, null=True, blank=True)


for news in container:
    fn_title = news.select_one(news_title)
    if not fn_title:
        continue

    fn_title = fn_title.text
    fn_description = news.select_one(news_description)

    md_url = news.select_one(news_url)
    if(not md_url):
        fn_url = news.attrs['href']
    else:
        fn_url = news.select_one(news_url)['href']

    fn_pub_date = news.select_one(news_pubdate).text

    formatted_pergunta = {
        'titulo': fn_title,
        'urlds': fn_url,
        'descricao': fn_description,
        'pub_data': fn_pub_date

    }

    processed_data.append(formatted_pergunta)

# TweezeStoreDB.db_insert(processed_data)
