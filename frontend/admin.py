from django.contrib import admin
from .models import Fonte


@admin.register(Fonte)
class FonteAdmin(admin.ModelAdmin):
    list_display = ('id', 'news_source', 'source_url_global',
                    'ativo', 'modificado')
    readonly_fields = ['source_slug']
    list_display_links = ('id', 'news_source')

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ['source_slug']
        return []
