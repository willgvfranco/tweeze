from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.http import HttpResponse
# Create your views here.
from django.contrib import messages
from django.views.generic import View, FormView
from .forms import ContatoForm, LoginForm, RegisterForm, RegisterCompanyForm, PositiveClippingForm, NegativeClippingForm
from django.urls import reverse_lazy

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

        positivas = self.request.POST.get('sendPositiveForm')
        negativas = self.request.POST.get('sendNegativeForm')
        # positivas = dict.sendPositiveForm
        # negativas = dict.sendNegativeForm
        print(str(request.body))
        arrayPositivas = positivas.split(',')
        arrayNegativas = negativas.split(',')

        print(f'positivas: {arrayPositivas}')
        print(f'negativas: {arrayNegativas}')
        # if not self.userform.is_valid() or not self.perfilform.is_valid():
        #     messages.error(
        #         self.request,
        #         'Existem erros no formulário de cadastro. Verifique se todos '
        #         'os campos foram preenchidos corretamente.'
        #     )

        #     return self.renderizar

        # username = self.userform.cleaned_data.get('username')
        # password = self.userform.cleaned_data.get('password')
        # email = self.userform.cleaned_data.get('email')
        # first_name = self.userform.cleaned_data.get('first_name')
        # last_name = self.userform.cleaned_data.get('last_name')

        # usuario = self.userform.save(commit=False)
        # usuario.set_password(password)
        # usuario.save()

        # perfil = self.perfilform.save(commit=False)
        # perfil.usuario = usuario
        # perfil.save()

        # if password:
        #     autentica = authenticate(
        #         self.request,
        #         username=usuario,
        #         password=password
        #     )

        #     if autentica:
        #         login(self.request, user=usuario)

        # self.request.session['carrinho'] = self.carrinho
        # self.request.session.save()

        # messages.success(
        #     self.request,
        #     'Seu cadastro foi criado com sucesso.'
        # )

        return redirect('dashboard:searchterms')


class SearchTermsView(TemplateView):
    template_name = 'my_terms.html'

    def get_context_data(self, **kwargs):
        context = super(SearchTermsView, self).get_context_data(**kwargs)
        context['segment'] = 'searchterms'
        context['grupos'] = [{
            "grupo": "grupo1",
            "positivas": ["foo", "bar"],
            "negativas": ["charmander", "squirtle", "bulbassauro", "pikachu"]
        },
            {
                "grupo": "grupo2",
                "positivas": ["foo", "bar"],
                "negativas": ["charmander", "squirtle", "bulbassauro", "pikachu"]
        },
            {
                "grupo": "Só negativas",
                "positivas": [""],
                "negativas": ["charmander", "squirtle", "bulbassauro", "pikachu"]
        },
            {
                "grupo": "Só positivas",
                "positivas": ["foo", "bar"],
                "negativas": [""]
        },
            {
                "grupo": "Muitas palavras",
                "positivas": ["foo", "bar", "lorem", 'raichu', 'jigglypuff', 'eevee', 'mewtwo', 'mew', 'celebi', 'ho-oh', 'moltres', 'zapdos', 'articuno'],
                "negativas": [""]
        }


        ]

        return context


# class AccountView(TemplateView):
#     template_name = 'account.html'

#     def get_context_data(self, **kwargs):
#         context = super(AccountView, self).get_context_data(**kwargs)
#         context['segment'] = 'account'

#         return context


# Formulario de contato (e-mail)
