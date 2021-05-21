# Generated by Django 3.2.2 on 2021-05-21 19:57

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GruposDePalavras',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criado', models.DateTimeField(auto_now_add=True, verbose_name='Criação')),
                ('modificado', models.DateTimeField(auto_now=True, null=True, verbose_name='Atualização')),
                ('ativo', models.BooleanField(default=True, null=True, verbose_name='Ativo?')),
                ('positivas', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, null=True, size=None)),
                ('negativas', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, null=True, size=None)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
