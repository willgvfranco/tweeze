# Generated by Django 3.1.7 on 2021-03-30 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0006_auto_20210329_2258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fonte',
            name='news_category',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='fonte',
            name='news_date',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='fonte',
            name='news_description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='fonte',
            name='source_category',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='fonte',
            name='source_initial_timer',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='fonte',
            name='source_regex',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='fonte',
            name='source_type',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
