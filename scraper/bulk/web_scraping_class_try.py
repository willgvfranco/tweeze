import requests
from bs4 import BeautifulSoup
import psycopg2

# conn = psycopg2.connect(dsn)

url = 'https://pt.stackoverflow.com/questions'
response = requests.get(url)
html = BeautifulSoup(response.text, 'html.parser')
noticia = html.select('.question-summary')
processed_data = []


class PatternNews:
    def __init__(self, fonte, titulo, url, descricao, pub_data):
        self.fonte = fonte
        self.titulo = titulo
        self.url = 'https://pt.stackoverflow.com' + url
        self.descricao = descricao
        self.pub_data = pub_data


for pergunta in noticia:
    # print(pergunta)
    fonte = "Stackoverflow"
    titulo = pergunta.select_one('.question-hyperlink')
    pub_data = pergunta.select_one('.relativetime')
    descricao = pergunta.select_one('.excerpt')
    url = pergunta.select_one('a')['href']

    # votos = pergunta.select_one('.vote-count-post strong')
    instance_PN = PatternNews(fonte, titulo.text, url,
                              descricao.text, pub_data.text)
    processed_data.append(instance_PN)
    # print(data.text, titulo.text, votos.text, sep='\t')

print(processed_data)
