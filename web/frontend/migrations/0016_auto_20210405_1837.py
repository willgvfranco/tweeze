# Generated by Django 3.1.7 on 2021-04-05 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0015_auto_20210402_0039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fonte',
            name='news_title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='pub_data',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='title',
            field=models.TextField(blank=True),
        ),
    ]