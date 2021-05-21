from django.contrib.postgres.fields import ArrayField
from django.db import models
from utils.classes import Always
# Create your models here.


class GruposDePalavras(Always):
    positivas = ArrayField(models.CharField(
        max_length=255), blank=True, null=True)
    negativas = ArrayField(models.CharField(
        max_length=255), blank=True, null=True)
