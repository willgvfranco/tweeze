# Generated by Django 3.1.7 on 2021-03-27 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Noticia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criados', models.DateField(auto_now_add=True, verbose_name='Criação')),
                ('modificado', models.DateField(auto_now=True, verbose_name='Atualização')),
                ('ativo', models.BooleanField(default=True, verbose_name='Ativo?')),
                ('fonte', models.CharField(max_length=255)),
                ('titulo', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=255)),
                ('descricao', models.CharField(max_length=255)),
                ('pub_data', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
