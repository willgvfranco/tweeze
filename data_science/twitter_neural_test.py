import spacy
import pandas as pd
import string
import spacy
import random
import seaborn as sns
import numpy as np
import re
from spacy.lang.pt.stop_words import STOP_WORDS
import matplotlib.pyplot as plt

from twitter_neural_model import adaptar_bd_twitter
from utils import preprocessamento

pln = spacy.load('pt_core_news_sm')

julia = spacy.load('./julia4')

# texto = "eu gosto de chocolate"
# texto_final = preprocessamento(texto)
# previsao = julia(texto_final)
#
# print(previsao.cats)

base_treinamento = pd.read_csv('./lessons/base_treinamento_100k_arrumado.csv', delimiter=',')
# base_teste = pd.read_csv('./lessons/base_teste_twitter.csv', delimiter=',')


base_dados_treinamento_final = adaptar_bd_twitter(base_treinamento)
# base_dados_teste_final = adaptar_bd_twitter(base_teste)

previsoes = []
for texto in base_treinamento['tweet_text']:
  previsao = julia(texto)
  previsoes.append(previsao.cats)

print(previsoes)

previsoes_final = []
for previsao in previsoes:
  if previsao['POSITIVO'] > previsao['NEGATIVO']:
    previsoes_final.append(1)
  else:
    previsoes_final.append(0)

previsoes_final = np.array(previsoes_final)

respostas_reais = base_treinamento['sentiment'].values

from sklearn.metrics import confusion_matrix, accuracy_score
accuracy_score(respostas_reais, previsoes_final)

cm = confusion_matrix(respostas_reais, previsoes_final)
cm