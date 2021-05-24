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
                                      "2021-05-23", "2021-05-24"]).annotate(search=vector).filter(search=query).order_by('-id')

    def get_queryset(self):
        qs = super().get_queryset()

        # print(arrayPositivas)
        # print(queryPositiva)

        # qs = Noticia.objects.filter(criado__range=["2021-05-21", "2021-05-24"]).annotate(
        #     search=vector).filter(search=query).order_by('-id')
        # print(list(qs))
        return qs

    # def get_context_data(self, **kwargs):
    #     context = super(ReportsView, self).get_context_data(**kwargs)
    #     grupos = GruposDePalavras.objects.filter(owner=self.request.user.id).values(
    #         'id', 'positivas', 'negativas', 'owner', 'grupo')
    #     context['grupos'] = list(grupos)
    #     self.request.session['grupos'] = list(grupos)
    #     print(grupos)
    #     return context

    # def post(self, request, *args, **kwargs):
    #     grupoID = self.request.POST.get('group')
    #     positivas = self.request.POST.get('sendPositiveForm')
    #     negativas = self.request.POST.get('sendNegativeForm')

    #     arrayPositivas = positivas.split(',')
    #     arrayNegativas = negativas.split(',')

    #     def get_queryset(self):
    #         qs = super().get_queryset()
    #         termo = self.request.GET.get('termo')

    #         if not termo:
    #             return qs
    #         print(termo)
    #         qs = qs.filter(
    #             Q(title__icontains=arrayPositivas)
    #         )


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
        # for palavra in arrayPositivas:
        #     queryPositiva.
        # arrayNegativas = negativas.split(',').
        vector = SearchVector('title', 'description')
        query = SearchQuery(queryPositiva)
        print(arrayPositivas)
        print(queryPositiva)
        news = Noticia.objects \
            .filter(criado__range=["2021-05-21", "2021-05-24"]) \
            .annotate(search=vector) \
            .filter(search=query) \

        print(list(news))
        context['noticias_filtradas'] = list(news)
        return context
        # if not arrayPositivas:
        #     return qs
        # qs = qs.filter(title__in=list(arrayPositivas)
        #                )
        # print(qs)
        # return qs


class CriarGrupoView(baseDashboard):
    def post(self, request, *args, **kwargs):
        # print(self)
        # print(request.user.id)
        # print(self)

        grupo = self.request.POST.get('group-name')
        positivas = self.request.POST.get('create_positives')
        negativas = self.request.POST.get('create_negatives')
        # groupid = self.request.POST.get('sendGroupId')
        # positivas = dict.sendPositiveForm
        # negativas = dict.sendNegativeForm

        arrayPositivas = positivas.split(',')
        arrayNegativas = negativas.split(',')

        # if arrayPositivas[0] == '':
        #     arrayPositivas = None

        # if arrayNegativas[0] == '':
        #     arrayPositivas = None
        # EDITANDO EXISTENTE
        # if groupid:
        #     grupo_existente = GruposDePalavras.objects.filter(
        #         id=groupid).first()
        #     grupo_existente.positivas = positivas
        #     grupo_existente.negativas = negativas
        #     grupo_existente.grupo = grupo
        #     grupo_existente.save()

        # CRIANDO NOVO
        novogrupo = GruposDePalavras(grupo=grupo,
                                        positivas=arrayPositivas, negativas=arrayNegativas, owner=request.user)
        novogrupo.save()

        print(f'positivas: {arrayPositivas}')
        print(f'negativas: {arrayNegativas}')

        return redirect('dashboard:searchterms')


class EditarGrupoView(baseDashboard):
    def post(self, request, *args, **kwargs):
        # print(self)
        # print(request.user.id)
        # print(self)

        grupo = self.request.POST.get('group-name')
        positivas = self.request.POST.get('edit_positives')
        negativas = self.request.POST.get('edit_negatives')
        groupid = self.request.POST.get('edit_group_id')
        # positivas = dict.sendPositiveForm
        # negativas = dict.sendNegativeForm

        arrayPositivas = positivas.split(',')
        arrayNegativas = negativas.split(',')

        # if(list(arrayPositivas)[0] == ''):
        #     arrayPositivas = None

        # if(list(arrayNegativas)[0] == ''):
        #     arrayPositivas = None
        grupo_existente = GruposDePalavras.objects.filter(
            id=groupid).first()
        grupo_existente.positivas = positivas
        grupo_existente.negativas = negativas
        grupo_existente.grupo = grupo
        grupo_existente.save()

        print(f'positivas: {arrayPositivas}')
        print(f'negativas: {arrayNegativas}')

        return redirect('dashboard:searchterms')



class DeletarGrupoView(baseDashboard):
    def delete(self, request, *args, **kwargs):
        # print(self)

        # positivas = dict.sendPositiveForm
        # negativas = dict.sendNegativeForm
        print(str(request.body))
        sendGroupId = self.request.DELETE.get('sendGroupId')
        grupo = GruposDePalavras.objects.filter(id=sendGroupId).first()
        del grupo

        return redirect('dashboard:searchterms')


class SearchTermsView(TemplateView):
    template_name = 'my_terms.html'

    def get_context_data(self, **kwargs):
        context = super(SearchTermsView, self).get_context_data(**kwargs)
        grupos = GruposDePalavras.objects.filter(owner=self.request.user.id).values(
            'id', 'positivas', 'negativas', 'owner', 'grupo')
        context['grupos'] = list(grupos)
        print(grupos)
        context['segment'] = 'searchterms'
        context['iduser'] = self.request.user.id
        return context


# class AccountView(TemplateView):
#     template_name = 'account.html'

#     def get_context_data(self, **kwargs):
#         context = super(AccountView, self).get_context_data(**kwargs)
#         context['segment'] = 'account'

#         return context


# Formulario de contato (e-mail)
