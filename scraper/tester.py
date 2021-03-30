import requests
from bs4 import BeautifulSoup
from arauto import tweeze_get_sources_db
# conn = psycopg2.connect(dsn)
from datetime import date

data = tweeze_get_sources_db(8)[0]

url = data['source_url_global']
response = requests.get(url)
xml_data = response.content
soup = BeautifulSoup(xml_data, features="xml", from_encoding='utf-8')
container = soup.findAll(data['news_container'])
processed_data = []


for news in container:
    # print(pergunta)
    if('/href' in data['news_url']):
        news_url_formmated = data['news_url'].removesuffix('/href')
        urlds = news.find(news_url_formmated)['href']
    else:
        urlds = news.find(data['news_url']).text
    # urlds = news.findAll(href=True)
    titulo = news.find(data['news_title']).text
    descricao = news.find(data['news_description']).text
    has_category = news.find(data['news_category'])
    if(has_category):
        category = news.find(data['news_category']).text
    else:
        category = ''
    has_data = news.find(data['news_date'])
    if(has_data):
        pub_data = has_data.text
    else:
        pub_data = date.today().strftime('%d/%m/%Y')

    formatted_pergunta = {
        'titulo': titulo.text,
        'urlds': urlds,
        'descricao': descricao.text,
        'pub_data': pub_data.text

    }

    processed_data.append(formatted_pergunta)


TweezeStoreDB.db_insert(processed_data)
