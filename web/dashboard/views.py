from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.http import HttpResponse
# Create your views here.
from django.contrib import messages
from django.views.generic import View, FormView
from .forms import ContatoForm, LoginForm, RegisterForm, RegisterCompanyForm, PositiveClippingForm, NegativeClippingForm
from django.urls import reverse_lazy


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

    def form_valid(self, form, *args, **kwargs):
        print(form)
        return super(NegativeClippingView, self).form_valid(form, *args, **kwargs)

    def form_invalid(self, form, *args, **kwargs):
        messages.error(self.request, 'Informações incorretas')
        return super(NegativeClippingView, self).form_invalid(form, *args, **kwargs)

        return context


class DashboardView(baseDashboard):
    template_name = 'dashboard.html'


class StatisticsView(baseDashboard):
    template_name = 'stats.html'

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


class SearchTermsView(baseDashboard):
    template_name = 'my_terms.html'

    def get_context_data(self, **kwargs):
        context = super(SearchTermsView, self).get_context_data(**kwargs)
        context['segment'] = 'searchterms'

        return context


# class AccountView(TemplateView):
#     template_name = 'account.html'

#     def get_context_data(self, **kwargs):
#         context = super(AccountView, self).get_context_data(**kwargs)
#         context['segment'] = 'account'

#         return context


# Formulario de contato (e-mail)
