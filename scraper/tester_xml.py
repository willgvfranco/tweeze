import requests
from bs4 import BeautifulSoup
from arauto import tweeze_get_sources_db
# conn = psycopg2.connect(dsn)
from datetime import date

data = "https://www.bbc.com/portuguese/topicos/brasil/index.xml"

# url = data['source_url_global']
response = requests.get(data)
xml_data = response.content
soup = BeautifulSoup(xml_data, features="xml", from_encoding='utf-8')
container = soup.findAll('entry')
processed_data = []
news_url = 'link'

for news in container:
    # print(pergunta)
    md_url = news.select_one(news_url)
    if(not md_url):
        url = news.attrs['href']
    elif('href' in md_url):
        url = news.select_one(news_url)['href']
    else:
        url = news.find(news_url).text

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


# TweezeStoreDB.db_insert(processed_data)
