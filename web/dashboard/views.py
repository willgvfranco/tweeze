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


class ReportsView(baseDashboard):
    template_name = 'reports.html'

    def get_context_data(self, **kwargs):
        context = super(ReportsView, self).get_context_data(**kwargs)
        context['segment'] = 'reports'

        return context


class CriarGrupoView(baseDashboard):
    def post(self, request, *args, **kwargs):
        # print(self)
        # print(request.user.id)
        # print(self)

        grupo = self.request.POST.get('group-name')
        positivas = self.request.POST.get('sendPositiveForm')
        negativas = self.request.POST.get('sendNegativeForm')
        groupid = self.request.POST.get('sendGroupId')
        # positivas = dict.sendPositiveForm
        # negativas = dict.sendNegativeForm

        arrayPositivas = positivas.split(',')
        arrayNegativas = negativas.split(',')

        # EDITANDO EXISTENTE
        if groupid:
            grupo_existente = GruposDePalavras.objects.filter(
                id=groupid).first()
            grupo_existente.positivas = positivas
            grupo_existente.negativas = negativas
            grupo_existente.grupo = grupo
            grupo_existente.save()

        # CRIANDO NOVO
        else:
            novogrupo = GruposDePalavras(grupo=grupo,
                                         positivas=arrayPositivas, negativas=arrayNegativas, owner=request.user)
            novogrupo.save()

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
        grupos = GruposDePalavras.objects.filter(
            owner=self.request.user.id).values('id', 'positivas', 'negativas', 'owner')
        print(grupos)
        context['segment'] = 'searchterms'
        context['iduser'] = self.request.user.id
        context['grupos'] = grupos
        return context


# class AccountView(TemplateView):
#     template_name = 'account.html'

#     def get_context_data(self, **kwargs):
#         context = super(AccountView, self).get_context_data(**kwargs)
#         context['segment'] = 'account'

#         return context


# Formulario de contato (e-mail)
