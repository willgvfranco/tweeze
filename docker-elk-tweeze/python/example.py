# -*- coding: utf-8 -*-
"""
Created on Tue Jun 29 13:45:57 2021

@author: alex
"""


from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from elasticsearch_dsl import A, Search, connections



    function abc(a,b):

if __name__ == "__main__":
    elasticsearch_host = "134.209.40.184"
    elasticsearch_port = 9200
    connections.create_connection(
        hosts=["{}:{}".format(elasticsearch_host, elasticsearch_port)], http_auth='elastic:PiLFSnE1MlS1ySmv9czF'
    ) 

    s = Search(index="noticias").query("match", title=a).exclude("match", title="lula")

    for hit in s.scan():
        print(hit.title)
    
    # for b in scan_aggs(
    #     Search(index="noticias") \
    #             .query("match", title="bolsonaro") \
    #             .query("match", title="lula")
    # ):
    #     print(b.meta.score, b.title, b.source)

