from django.urls import path
from . import views

app_name = 'perfil'

urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),
    # path('stats/', views.StatisticsView.as_view(), name='stats'),
    # path('reports/', views.ReportsView.as_view(), name='reports'),
    # path('searchterms/', views.SearchTermsView.as_view(), name='searchterms'),
    # path('account/', views.AccountView.as_view(), name='account'),
]
