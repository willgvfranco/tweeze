import requests
from bs4 import BeautifulSoup
from arauto import TweezeStoreDB
# conn = psycopg2.connect(dsn)

url = 'https://pt.stackoverflow.com/questions'
response = requests.get(url)
html = BeautifulSoup(response.text, 'html.parser')
noticia = html.select('.question-summary')
processed_data = []


for pergunta in noticia:
    # print(pergunta)
    fonte = "Stackoverflow"
    titulo = pergunta.select_one('.question-hyperlink')
    pub_data = pergunta.select_one('.relativetime')
    descricao = pergunta.select_one('.excerpt')
    url = pergunta.select_one('a')['href']

    formatted_pergunta = {
        'fonte': fonte,
        'titulo': titulo.text,
        'url': 'https://pt.stackoverflow.com' + url,
        'descricao': descricao.text,
        'pub_data': pub_data.text

    }

    processed_data.append(formatted_pergunta)


TweezeStoreDB.db_insert(processed_data)
