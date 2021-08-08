from django.contrib import admin
from .models import Fonte, Faq


@admin.register(Fonte)
class FonteAdmin(admin.ModelAdmin):
    list_display = ('id', 'linguagem', 'news_source', 'source_url_global',
                    'ativo', 'modificado')
    readonly_fields = ['source_slug']
    list_display_links = ('id', )
    list_editable = ('linguagem',)

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ['source_slug']
        return []


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ('id', 'pergunta',)
    list_display_links = ('pergunta',)
