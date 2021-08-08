from django.contrib.postgres.fields import ArrayField
from django.db import models
from utils.classes import Always
# Create your models here.
from django.contrib.auth.models import User


class GruposDePalavras(Always):
    positivas = ArrayField(models.CharField(
        max_length=255), blank=True, null=True)
    negativas = ArrayField(models.CharField(
        max_length=255), blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    grupo = models.CharField(max_length=64)
