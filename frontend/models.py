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
    news_container = models.CharField(max_length=255)
    news_url = models.CharField(max_length=255, null=True)
    news_source = models.CharField(max_length=255)
    news_title = models.CharField(max_length=255)
    news_date = models.CharField(max_length=255, blank=True, null=True)
    news_description = models.CharField(max_length=255, null=True, blank=True)
    news_category = models.CharField(max_length=255, null=True, blank=True)
    source_initial_timer = models.IntegerField(null=True, blank=True)
    source_regex = models.CharField(max_length=255, null=True, blank=True)
    source_type = models.CharField(max_length=255, blank=True)
    source_category = models.CharField(max_length=255, null=True, blank=True)


class Noticia(Always):
    # fonte = models.CharField(max_length=255)
    fonte = models.ForeignKey(
        Fonte, on_delete=models.DO_NOTHING, blank=True, null=True)
    titulo = models.TextField()
    url = models.TextField()
    categoria = models.TextField(null=True)
    descricao = models.TextField(null=True)
    pub_data = models.CharField(max_length=255)
