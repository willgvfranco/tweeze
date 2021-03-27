import requests
from bs4 import BeautifulSoup
import psycopg2

# conn = psycopg2.connect(dsn)

url = 'https://pt.stackoverflow.com/questions'
response = requests.get(url)
html = BeautifulSoup(response.text, 'html.parser')
noticia = html.select('.question-summary')
processed_notice = []

for pergunta in noticia:
    # print(pergunta)
    titulo = pergunta.select_one('.question-hyperlink')
    data = pergunta.select_one('.relativetime')
    votos = pergunta.select_one('.vote-count-post strong')

    # print(data.text, titulo.text, votos.text, sep='\t')

print(noticia)
