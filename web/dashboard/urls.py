from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.DashboardView.as_view(), name='home'),
    path('stats/', views.StatisticsView.as_view(), name='stats'),
    path('reports/', views.ReportsView.as_view(), name='reports'),
    path('searchterms/', views.SearchTermsView.as_view(), name='searchterms'),
    path('criargrupo/', views.CriarGrupoView.as_view(), name='criargrupo'),
    path('editargrupo/', views.EditarGrupoView.as_view(), name='editargrupo'),
    path('deletargrupo/', views.DeletarGrupoView.as_view(), name='deletargrupo'),
    path('searchterms/<pk>', views.SearchTermsView.as_view(), name='editargrupo'),
    #     path('account/', views.AccountView.as_view(), name='account'),
    #     path('login/', views.LoginView.as_view(), name='login'),
    #     path('register/', views.RegisterView.as_view(), name='register'),
    #     path('register/company/', views.RegisterCompanyView.as_view(),
    #          name='registerCompany'),
    path('register/positive-clipping/',
         views.PositiveClippingView.as_view(), name='positiveClipping'),
    path('register/negative-clipping/',
         views.NegativeClippingView.as_view(), name='negativeClipping'),
]
