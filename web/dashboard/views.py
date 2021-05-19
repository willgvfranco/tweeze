from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
# Create your views here.


class DashboardView(TemplateView):
    # template_name = 'dashboard.html'

    # def get_context_data(self, **kwargs):
    #     context = super(DashboardView, self).get_context_data(**kwargs)
    #     context['segment'] = 'dashboard'

    #     return context

    def get(self, request, *args, **kwargs):
        return HttpResponse('Dashboard gogoo')


# class AccountView(TemplateView):
#     template_name = 'account.html'

#     def get_context_data(self, **kwargs):
#         context = super(AccountView, self).get_context_data(**kwargs)
#         context['segment'] = 'account'

#         return context
