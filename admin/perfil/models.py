from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import re
from utils.validacpf import valida_cpf
from utils.classes import Always
# Create your models here.


class Perfil(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    data_nascimento = models.DateField(blank=True, null=True)
    cpf = models.CharField(max_length=11, blank=True, null=True)
    telefone = models.CharField(max_length=12, blank=True, null=True)
    endereco = models.CharField(max_length=80, blank=True, null=True)
    numero = models.CharField(max_length=6, blank=True, null=True)
    complemento = models.CharField(max_length=30, blank=True, null=True)
    bairro = models.CharField(max_length=30, blank=True, null=True)
    cep = models.CharField(max_length=8, blank=True, null=True)
    cidade = models.CharField(max_length=60, blank=True, null=True)
    estado = models.CharField(
        blank=True, null=True,
        max_length=2,
        choices=(
            ('AC', 'Acre'),
            ('AL', 'Alagoas'),
            ('AP', 'Amapá'),
            ('AM', 'Amazonas'),
            ('BA', 'Bahia'),
            ('CE', 'Ceará'),
            ('DF', 'Distrito Federal'),
            ('ES', 'Espírito Santo'),
            ('GO', 'Goiás'),
            ('MA', 'Maranhão'),
            ('MT', 'Mato Grosso'),
            ('MS', 'Mato Grosso do Sul'),
            ('MG', 'Minas Gerais'),
            ('PA', 'Pará'),
            ('PB', 'Paraíba'),
            ('PR', 'Paraná'),
            ('PE', 'Pernambuco'),
            ('PI', 'Piauí'),
            ('RJ', 'Rio de Janeiro'),
            ('RN', 'Rio Grande do Norte'),
            ('RS', 'Rio Grande do Sul'),
            ('RO', 'Rondônia'),
            ('RR', 'Roraima'),
            ('SC', 'Santa Catarina'),
            ('SP', 'São Paulo'),
            ('SE', 'Sergipe'),
            ('TO', 'Tocantins'),
        )
    )

    def __str__(self):
        # return f'{self.usuario.first_name} {self.usuario.last_name}'
        return f'{self.usuario}'

    def clean(self):
        error_messages = {}

        if not valida_cpf(self.cpf):
            error_messages['cpf'] = 'Digite um CPF válido'

        if re.search(r'[^0-9]', self.cep) or len(self.cep) < 8:
            error_messages['cep'] = 'CEP inválido, digite os 8 dígitos do CEP.'

        if error_messages:
            raise ValidationError(error_messages)

    class Meta:
        verbose_name = 'Perfil'
        verbose_name_plural = 'Perfis'
