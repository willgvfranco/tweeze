from django.db import models
from django.utils import timezone
# Create your models here.


class Always(models.Model):
    criado = models.DateField('Criação', auto_now_add=True)
    modificado = models.DateField('Atualização', auto_now=True, null=True)
    ativo = models.BooleanField('Ativo?', default=True, null=True)

    class Meta:
        abstract = True


class Noticia(Always):
    fonte = models.CharField(max_length=255)
    titulo = models.TextField()
    url = models.TextField()
    descricao = models.TextField()
    pub_data = models.CharField(max_length=255)
