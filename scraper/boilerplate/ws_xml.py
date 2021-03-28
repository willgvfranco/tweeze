

from bs4 import BeautifulSoup
# from bs4.element import Comment
# import numpy as np
import requests
from arauto import TweezeStoreDB

# final_data = pd.DataFrame()
# for i in range(10):

url = "https://g1.globo.com/rss/g1/"

xml_data = requests.get(url).content
# abc = xml_data.content

soup = BeautifulSoup(xml_data, features="xml")

# Find all text in the data
texts = str(soup.findAll(text=True)).replace('\\n', '')

# Find the tag/child
child = soup.findAll("item")
processed_data = []


for news in child:
    fonte = "G1"
    titulo = news.find('title').text
    pub_data = news.find('pubDate').text
    descricao = news.find('description').text
    url = news.find('guid').text

    formatted_pergunta = {
        'fonte': fonte,
        'titulo': titulo,
        'url': url,
        'descricao': descricao,
        'pub_data': pub_data

    }

    processed_data.append(formatted_pergunta)

TweezeStoreDB.db_insert(processed_data)
