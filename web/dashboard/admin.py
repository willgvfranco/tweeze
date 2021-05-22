from django.contrib import admin
from .models import GruposDePalavras
# Register your models here.


@admin.register(GruposDePalavras)
class GruposDePalavrasAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner')
    list_display_links = ('id', 'owner')
