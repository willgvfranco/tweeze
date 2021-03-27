from django.db import models
from django.utils import timezone
# Create your models here.


class Always(models.Model):
    criados = models.DateField('Criação', auto_now_add=True)
    modificado = models.DateField('Atualização', auto_now=True)
    ativo = models.BooleanField('Ativo?', default=True)

    class Meta:
        abstract = True


class Noticia(Always):
    fonte = models.CharField(max_length=255)
    titulo = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    pub_data = models.CharField(max_length=255)
