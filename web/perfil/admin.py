from django.contrib import admin
from .models import Perfil

# Register your models here.


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario',)
    list_display_links = ('usuario',)
