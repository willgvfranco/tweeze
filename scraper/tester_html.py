import requests
from bs4 import BeautifulSoup
from arauto import tweeze_get_sources_db
# conn = psycopg2.connect(dsn)
from datetime import date
import re


source_url_global = "https://www.anoticiamt.com.br/index_secao.php?sid=999"
news_container = "div.col-xs-12 col-sm-12 col-md-12 col-lg-12"
news_description = 'h2'
news_pubdate = 'span.tpl-list-datedesc'
news_url = 'a'
news_title = 'h2.tpl-list-title'


response = requests.get(source_url_global)
html_data = response.content
soup = BeautifulSoup(html_data, 'html.parser', from_encoding='utf-8')

formatted_container = news_container.split(".")

container = soup.findAll(
    formatted_container[0], class_=formatted_container[1])
# container = soup.findAll(
#     "a", attrs={"href": "Publicacao"})
# container = soup.findAll(href=re.compile("Publicacao"))
processed_data = []


# news_date = models.CharField(max_length=255, blank=True, null=True)
# news_description = models.CharField(max_length=255, null=True, blank=True)


for news in container:
    fn_title = news.select_one(news_title)
    if not fn_title:
        continue

    fn_title = fn_title.text
    fn_description = news.select_one(news_description)

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
