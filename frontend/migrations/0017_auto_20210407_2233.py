# Generated by Django 3.1.7 on 2021-04-08 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0016_auto_20210405_1837'),
    ]

    operations = [
        migrations.AlterField(
            model_name='noticia',
            name='category',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='pub_data',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
