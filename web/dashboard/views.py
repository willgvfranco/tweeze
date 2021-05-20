from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
# Create your views here.
from django.contrib import messages
from django.views.generic import View, FormView
from .forms import ContatoForm, LoginForm, RegisterForm, RegisterCompanyForm, PositiveClippingForm, NegativeClippingForm
from django.urls import reverse_lazy


# class DashboardView(TemplateView):
# template_name = 'dashboard.html'

# def get_context_data(self, **kwargs):
#     context = super(DashboardView, self).get_context_data(**kwargs)
#     context['segment'] = 'dashboard'

#     return context

# def get(self, request, *args, **kwargs):
#     return HttpResponse('Dashboard gogoo')


# class AccountView(TemplateView):
#     template_name = 'account.html'

#     def get_context_data(self, **kwargs):
#         context = super(AccountView, self).get_context_data(**kwargs)
#         context['segment'] = 'account'

#         return context


class LoginView(FormView):
    template_name = 'login.html'
    form_class = LoginForm
    success_url = reverse_lazy('login')

    def get_context_data(self, **kwargs):
        context = super(LoginView, self).get_context_data(**kwargs)

    def form_valid(self, form, *args, **kwargs):
        return super(LoginView, self).form_valid(form, *args, **kwargs)

    def form_invalid(self, form, *args, **kwargs):
        messages.error(self.request, 'Login incorreto')
        return super(LoginView, self).form_invalid(form, *args, **kwargs)

        return context


# Formularios de cadastro
class RegisterView(FormView):
    template_name = 'register.html'
    form_class = RegisterForm
    success_url = reverse_lazy('register')

    def get_context_data(self, **kwargs):
        context = super(RegisterView, self).get_context_data(**kwargs)

    def form_valid(self, form, *args, **kwargs):
        print(form)
        return super(RegisterView, self).form_valid(form, *args, **kwargs)

    def form_invalid(self, form, *args, **kwargs):
        messages.error(self.request, 'Informações incorretas')
        return super(RegisterView, self).form_invalid(form, *args, **kwargs)

        return context


class RegisterCompanyView(FormView):
    template_name = 'register_company.html'
    form_class = RegisterCompanyForm
    success_url = reverse_lazy('registerCompany')

    def get_context_data(self, **kwargs):
        context = super(RegisterCompanyView, self).get_context_data(**kwargs)

    def form_valid(self, form, *args, **kwargs):
        print(form)
        return super(RegisterCompanyView, self).form_valid(form, *args, **kwargs)

    def form_invalid(self, form, *args, **kwargs):
        messages.error(self.request, 'Informações incorretas')
        return super(RegisterCompanyView, self).form_invalid(form, *args, **kwargs)

        return context


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


class DashboardView(TemplateView):
    template_name = 'dashboard.html'

    def get_context_data(self, **kwargs):
        context = super(DashboardView, self).get_context_data(**kwargs)
        context['segment'] = 'dashboard'

        return context


class StatisticsView(TemplateView):
    template_name = 'stats.html'

    def get_context_data(self, **kwargs):
        context = super(StatisticsView, self).get_context_data(**kwargs)
        context['segment'] = 'stats'

        return context


class ReportsView(TemplateView):
    template_name = 'reports.html'

    def get_context_data(self, **kwargs):
        context = super(ReportsView, self).get_context_data(**kwargs)
        context['segment'] = 'reports'

        return context


class SearchTermsView(TemplateView):
    template_name = 'my_terms.html'

    def get_context_data(self, **kwargs):
        context = super(SearchTermsView, self).get_context_data(**kwargs)
        context['segment'] = 'searchterms'

        return context


class AccountView(TemplateView):
    template_name = 'account.html'

    def get_context_data(self, **kwargs):
        context = super(AccountView, self).get_context_data(**kwargs)
        context['segment'] = 'account'

        return context


# Formulario de contato (e-mail)
