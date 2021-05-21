from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.HomeView.as_view(), name='index'),
    path('busca/', views.NoticiaBusca.as_view(), name='busca'),
    path('landing/', views.LandingPageView.as_view(), name='landingpage'),
    #     path('login/', views.LoginView.as_view(), name='login'),
    #     path('register/', views.RegisterView.as_view(), name='register'),
    #     path('register/company/', views.RegisterCompanyView.as_view(),
    #          name='registerCompany'),
    #     path('register/positive-clipping/',
    #          views.PositiveClippingView.as_view(), name='positiveClipping'),
    #     path('register/negative-clipping/',
    #          views.NegativeClippingView.as_view(), name='negativeClipping'),
    # path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
    # path('dashboard/stats/', views.StatisticsView.as_view(), name='stats'),
    # path('dashboard/reports/', views.ReportsView.as_view(), name='reports'),
    # path('dashboard/searchterms/', views.SearchTermsView.as_view(), name='searchterms'),
    # path('dashboard/account/', views.AccountView.as_view(), name='account'),
    # path('<int:contato_id>', views.ver_contato, name='ver_contato')
]
