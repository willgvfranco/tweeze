from django.db import models
from django.utils import timezone
# Create your models here.
from .utils import ESTADOS_BR, ARQUIVOS


class Always(models.Model):
    criado = models.DateTimeField(
        'Criação', auto_now_add=True)
    modificado = models.DateTimeField('Atualização', auto_now=True, null=True)
    ativo = models.BooleanField('Ativo?', default=True, null=True)

    class Meta:
        abstract = True


class Fonte(Always):
    source_slug = models.CharField(
        max_length=255, verbose_name="Slug da Fonte")
    source_url_global = models.CharField(
        max_length=255, verbose_name="Link geral da Fonte")
    news_container = models.CharField(
        max_length=255, verbose_name="Container das notícias")
    news_url = models.CharField(
        max_length=255, null=True, verbose_name="Elemento da Url")
    news_source = models.CharField(
        max_length=255, verbose_name="Nome da Fonte")
    # news_date = models.CharField(max_length=255, blank=True, null=True)
    # news_description = models.CharField(max_length=255, null=True, blank=True)
    # news_category = models.CharField(max_length=255, null=True, blank=True, verbose_name="Categoria ")
    source_initial_timer = models.IntegerField(
        null=True, blank=True, verbose_name="Tempo Inicial")
    source_regex = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="Base da URL (Facultativo)")
    source_type = models.CharField(
        max_length=255, choices=ARQUIVOS, verbose_name="Tipo de Fonte")
    source_category = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="Categoria da Fonte")
    source_state = models.CharField(
        max_length=3, choices=ESTADOS_BR, null=True, blank=True, verbose_name="Estado de Origem da Fonte")
    source_municipio = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="Município de Origem da Fonte")


class Noticia(Always):
    # fonte = models.CharField(max_length=255)
    fonte = models.ForeignKey(
        Fonte, on_delete=models.SET_NULL, blank=True, null=True)
    title = models.TextField(blank=True)
    url = models.TextField()
    source = models.TextField()
    category = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    pub_data = models.CharField(max_length=255, blank=True, null=True)


class Faq(Always):
    pergunta = models.CharField(max_length=255)
    resposta = models.TextField()
