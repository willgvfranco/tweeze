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
import nltk

pln = spacy.load('pt_core_news_sm')



def adaptar_bd_twitter(base_dados):
    # base_dados = pd.read_csv(raw, encoding='utf-8')
    # base_dados['texto'] = base_dados['texto'].apply(preprocessamento)

    base_dados_final = []
    for texto, emocao in zip(base_dados['tweet_text'], base_dados['sentiment']):
        if emocao == 1:
            dic = ({'POSITIVO': True, 'NEGATIVO': False})
        elif emocao == 0:
            dic = ({'POSITIVO': False, 'NEGATIVO': True})

        base_dados_final.append([str(texto), dic.copy()])

    return base_dados_final


base_treinamento = pd.read_csv('./lessons/base_treinamento_50k_twitter.csv', delimiter=',')
# base_teste = pd.read_csv('./lessons/base_teste_twitter.csv', delimiter=',')


base_dados_treinamento_final = adaptar_bd_twitter(base_treinamento)
# base_dados_teste_final = adaptar_bd_twitter(base_teste)

modelo = spacy.blank('pt')
categorias = modelo.create_pipe("textcat")
categorias.add_label("POSITIVO")
categorias.add_label("NEGATIVO")
modelo.add_pipe(categorias)
historico = []

modelo.begin_training()
for epoca in range(20):
    random.shuffle(base_dados_treinamento_final)
    losses = {}
    for batch in spacy.util.minibatch(base_dados_treinamento_final, 512):
        textos = [modelo(texto) for texto, entities in batch]
        annotations = [{'cats': entities} for texto, entities in batch]
        modelo.update(textos, annotations, losses=losses)
        historico.append(losses)
    # if epoca % 5 == 0:
        print(losses)

historico_loss = []
for i in historico:
    historico_loss.append(i.get('textcat'))

historico_loss = np.array(historico_loss)
print(historico_loss)

plt.plot(historico_loss)
plt.title('Progressão do erro')
plt.xlabel('Batches')
plt.ylabel('Erro')

modelo.to_disk("./julia")
