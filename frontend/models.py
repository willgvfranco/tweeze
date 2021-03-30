from django.db import models
from django.utils import timezone
# Create your models here.


class Always(models.Model):
    criado = models.DateTimeField(
        'Criação', auto_now_add=True)
    modificado = models.DateTimeField('Atualização', auto_now=True, null=True)
    ativo = models.BooleanField('Ativo?', default=True, null=True)

    class Meta:
        abstract = True


class Fonte(Always):
    source_slug = models.CharField(max_length=255)
    source_url_global = models.CharField(max_length=255)
    source_type = models.CharField(max_length=255)
    source_initial_timer = models.IntegerField(null=True)
    source_regex = models.CharField(max_length=255, null=True)
    news_source = models.CharField(max_length=255)
    news_container = models.CharField(max_length=255)
    news_title = models.CharField(max_length=255)
    news_description = models.CharField(max_length=255, null=True)
    news_date = models.CharField(max_length=255, null=True)
    news_category = models.CharField(max_length=255, null=True)
    news_url = models.CharField(max_length=255, null=True)


class Noticia(Always):
    fonte = models.CharField(max_length=255)
    titulo = models.TextField()
    url = models.TextField()
    categoria = models.TextField(null=True)
    descricao = models.TextField(null=True)
    pub_data = models.CharField(max_length=255)
