import requests
from bs4 import BeautifulSoup
import thread

url = 'https://pt.stackoverflow.com/questions'
response = requests.get(url)
html = BeautifulSoup(response.text, 'html.parser')
noticia = html.select('.question-summary')

for item in noticia:
