from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.http import HttpResponse
# Create your views here.
from django.contrib import messages
from django.views.generic import View, FormView
from .forms import ContatoForm, LoginForm, RegisterForm, RegisterCompanyForm, PositiveClippingForm, NegativeClippingForm
from django.urls import reverse_lazy
from .models import GruposDePalavras
import json
from frontend.models import Noticia
from django.db.models import Q
from django.views.generic.list import ListView
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector


class baseDashboard(TemplateView):

    # Autenticação
    def get(self, request, *args, **kwargs):
        self.renderizar = render(
            self.request, self.template_name)
        if not self.request.user.is_authenticated:
            return redirect('perfil:home')
        return self.renderizar


class PositiveClippingView(FormView):
    template_name = 'positive_clipping.html'
    form_class = PositiveClippingForm
    success_url = reverse_lazy('positiveClipping')

    def get_context_data(self, **kwargs):
        context = super(PositiveClippingView, self).get_context_data(**kwargs)

    def form_valid(self, form, *args, **kwargs):
        print(form)
        return super(PositiveClippingView, self).form_valid(form, *args, **kwargs)

    def form_invalid(self, form, *args, **kwargs):
        messages.error(self.request, 'Informações incorretas')
        return super(PositiveClippingView, self).form_invalid(form, *args, **kwargs)

        return context


class NegativeClippingView(FormView):
    template_name = 'negative_clipping.html'
    form_class = NegativeClippingForm
    success_url = reverse_lazy('negativeClipping')

    def get_context_data(self, **kwargs):
        context = super(NegativeClippingView, self).get_context_data(**kwargs)

        return context

    def form_valid(self, form, *args, **kwargs):
        print(form)
        return super(NegativeClippingView, self).form_valid(form, *args, **kwargs)

    def form_invalid(self, form, *args, **kwargs):
        messages.error(self.request, 'Informações incorretas')
        return super(NegativeClippingView, self).form_invalid(form, *args, **kwargs)


class DashboardView(baseDashboard):
    template_name = 'dashboard.html'


class StatisticsView(baseDashboard):
    template_name = 'stats.html'
    context_object_name = 'grupos'

    def get_context_data(self, **kwargs):
        context = super(StatisticsView, self).get_context_data(**kwargs)
        context['segment'] = 'stats'

        return context


class ReportsView(ListView):
    template_name = 'reports.html'
    model = Noticia
    paginate_by = 30
    context_object_name = 'noticias_filtradas'
    # negativas = self.request.POST.get('sendNegativeForm')

    positivas = "Flamengo"

    queryPositiva = "'"+positivas.replace(",", "' | '")+"'"

    vector = SearchVector('title', 'description')
    query = SearchQuery(queryPositiva)
    queryset = Noticia.objects.filter(criado__range=[
                                      "2021-05-23", "2021-05-24"])
    #   .annotate(search=vector).filter(search=query).order_by('-id')

    def get_queryset(self):
        qs = super().get_queryset()
        return qs


class ReportsBusca(baseDashboard):
    # template_name = 'busca.html'
    model = Noticia
    # paginate_by = 30
    # context_object_name = 'noticias'

    def get_context_data(self, **kwargs):
        context = super(ReportsBusca, self).get_context_data(**kwargs)

        # qs = super().get_queryset()
        # grupoID = self.request.POST.get('group')
        # positivas = self.request.POST.get('sendPositiveForm')
        positivas = "Flamengo,vasco,fluminense,botafogo"
        # negativas = self.request.POST.get('sendNegativeForm')

        arrayPositivas = positivas.split(',')

        queryPositiva = "'"+positivas.replace(",", "' | '")+"'"

        vector = SearchVector('title', 'description')
        query = SearchQuery(queryPositiva)
        print(arrayPositivas)
        print(queryPositiva)
        news = Noticia.objects \
            .filter(criado__range=["2021-05-21", "2021-05-24"])
        news = news.annotate(search=vector).filter(search=query)

        print(list(news))
        context['noticias_filtradas'] = list(news)
        return context


# TERMOS


class SearchTermsView(TemplateView):
    template_name = 'my_terms.html'

    def get_context_data(self, **kwargs):
        context = super(SearchTermsView, self).get_context_data(**kwargs)
        grupos = GruposDePalavras.objects \
            .values('id', 'positivas', 'negativas', 'owner', 'grupo') \
            # .filter(owner=self.request.user.id) \

        context['grupos'] = list(grupos)
        context['segment'] = 'searchterms'
        context['iduser'] = self.request.user.id

        return context


class CriarGrupoView(baseDashboard):
    def post(self, request, *args, **kwargs):

        grupo = self.request.POST.get('group-name')
        positivas = self.request.POST.get('create_positives')
        negativas = self.request.POST.get('create_negatives')

        arrayPositivas = positivas.split(',')
        arrayNegativas = negativas.split(',')

        novogrupo = GruposDePalavras(grupo=grupo,
                                     positivas=arrayPositivas,
                                     negativas=arrayNegativas,
                                     owner=request.user)

        novogrupo.save()

        print(f'positivas: {arrayPositivas}')
        print(f'negativas: {arrayNegativas}')

        return redirect('dashboard:searchterms')


class EditarGrupoView(baseDashboard):
    def post(self, request, *args, **kwargs):

        grupo = self.request.POST.get('group-name')
        positivas = self.request.POST.get('edit_positives')
        negativas = self.request.POST.get('edit_negatives')
        groupid = self.request.POST.get('edit_group_id')
        # positivas = dict.sendPositiveForm
        # negativas = dict.sendNegativeForm

        arrayPositivas = positivas.split(',')
        arrayNegativas = negativas.split(',')

        grupo_existente = GruposDePalavras.objects.filter(
            id=groupid).first()
        grupo_existente.positivas = arrayPositivas
        grupo_existente.negativas = arrayNegativas
        grupo_existente.grupo = grupo
        grupo_existente.save()

        print(f'positivas: {arrayPositivas}')
        print(f'negativas: {arrayNegativas}')

        return redirect('dashboard:searchterms')


class DeletarGrupoView(SearchTermsView):

    def post(self, request, *args, **kwargs):

        print(str(request.body))
        sendGroupId = self.request.POST.get('delete_group_id')
        grupo = GruposDePalavras.objects.filter(id=sendGroupId).first()
        grupo.delete()

        return redirect('dashboard:searchterms')
