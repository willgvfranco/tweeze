import json
from django.contrib import messages
from django.views.generic import View, FormView
from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.
from django.views.generic.list import ListView
from .models import Noticia, Fonte
from django.db.models import Q, Count, Case, When
from decouple import config
from .forms import ContatoForm
from django.urls import reverse_lazy


class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        # O que ja tiver, retorna.
        context = super(HomeView, self).get_context_data(**kwargs)
        context['app_name'] = config('APP_NAME')  # Adicionando
        context['fontes'] = Noticia.objects.all().order_by('-id')[:40]

        return context

# Formulario de contato (e-mail)


class ContatoView(FormView):
    template_name = 'index.html'
    form_class = ContatoForm
    success_url = reverse_lazy('index')

    def get_context_data(self, **kwargs):
        # O que ja tiver, retorna.
        context = super(HomeView, self).get_context_data(**kwargs)
        context['app_name'] = config('APP_NAME')  # Adicionando
        context['fontes'] = Fonte.objects.all()
        return context

    def form_valid(self, form, *args, **kwargs):
        form.send_mail()
        messages.success(self.request, 'E-mail enviado com sucesso')
        return super(ContatoView, self).form_valid(form, *args, **kwargs)

    def form_invalid(self, form, *args, **kwargs):
        messages.error(self.request, 'Erro ao enviar e-mail')
        return super(ContatoView, self).form_invalid(form, *args, **kwargs)


class NoticiaIndex(ListView):
    model = Noticia
    template_name = 'index.html'
    paginate_by = 40
    context_object_name = 'noticias'

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.order_by('-id')

        return qs


class NoticiaBusca(NoticiaIndex):
    template_name = 'busca.html'

    def get_queryset(self):
        qs = super().get_queryset()
        termo = self.request.GET.get('termo')

        if not termo:
            return qs
        print(termo)
        qs = qs.filter(
            Q(title__icontains=termo) |
            Q(description__icontains=termo) |
            Q(source__icontains=termo)
        )
        # print(qs)
        return qs


# def busca(request):
#     termo = request.GET.get('termourl')
#     # termo = 'globo.com'
#     if termo is None or not termo:
#         messages.add_message(request, messages.ERROR, 'Texto vazio')
#         return redirect('index')

#     # if 'http' in termo:
#     #     print('termo ok')
#     # else:
#     #     termo = 'http://' + termo
#     #     print(termo)
#     # responseb = builtwith(termo)
#     # charmander = whois.whois(termo)
#     # print(f'response: {responseb}')
#     # linkgoogle = 'https://developers.google.com/speed/pagespeed/insights/?url=' + termo
#     if bool(responseb):
#         responseJson = json.dumps(responseb)
#         return render(request, 'busca.html', {
#             'nome': linkgoogle,
#             'resposta': responseb
#         })
#     else:
#         return redirect('index')
