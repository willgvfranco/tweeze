import re
import nltk
import string
import pandas as pd
import heapq
nltk.download('punkt')
nltk.download('stopwords')

texto_original = """A inteligência artificial é a inteligência similar à humana.
                    Definem como o estudo de agente artificial com inteligência.
                    Ciência e engenharia de produzir máquinas com inteligência.
                    Resolver problemas e possuir inteligência.
                    Relacionada ao comportamento inteligente.
                    Construção de máquinas para raciocinar.
                    Aprender com os erros e acertos.
                    Inteligência artificial é raciocinar nas situações do cotidiano."""


def preprocesamento(texto):
    texto = re.sub('\s+', ' ', texto)
    texto_formatado = texto.lower()
    tokens = []
    stopwords = nltk.corpus.stopwords.words('portuguese')
    for token in nltk.word_tokenize(texto_formatado):
        tokens.append(token)
    tokens = [
        palavra for palavra in tokens if palavra not in stopwords and palavra not in string.punctuation]
    texto_formatado = ' '.join([str(elemento)
                                for elemento in tokens if not elemento.isdigit()])

    return texto_formatado


texto_formatado = preprocesamento(texto_original)

lista_palavras = nltk.word_tokenize(texto_original)
lista_sentencas = nltk.sent_tokenize(texto_original)

# frequencia
frequencia_palavras = nltk.FreqDist(nltk.word_tokenize(texto_formatado))
for a in frequencia_palavras:
    print(a, frequencia_palavras[a])

frequencia_palavras_relativa = frequencia_palavras.copy()

frequencia_maxima = max(frequencia_palavras.values())
for palavra in frequencia_palavras.keys():
    frequencia_palavras_relativa[palavra] = (
        frequencia_palavras[palavra] / frequencia_maxima)

for a in frequencia_palavras_relativa:
    print(a, frequencia_palavras_relativa[a])

notas_sentencas = {}
for sentenca in lista_sentencas:
    for palavra in nltk.word_tokenize(sentenca.lower()):
        if palavra in frequencia_palavras_relativa.keys():
            if sentenca not in notas_sentencas.keys():
                notas_sentencas[sentenca] = frequencia_palavras_relativa[palavra]
            else:
                notas_sentencas[sentenca] += frequencia_palavras_relativa[palavra]

# print(notas_sentencas)
print(dict(sorted(notas_sentencas.items(),
                  key=lambda item: item[1], reverse=True)))


melhores_sentencas = heapq.nlargest(
    3, notas_sentencas, key=notas_sentencas.get)
# data = pd.DataFrame.from_dict(
#     frequencia_palavras, orient='index').sort_values(frequencia_palavras[0], ascending=False)
# print(data)
