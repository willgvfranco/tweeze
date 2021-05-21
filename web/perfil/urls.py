from django.urls import path
from . import views

app_name = 'perfil'

urlpatterns = [
    path('', views.LoginView.as_view(), name='home'),
    path('register/', views.Criar.as_view(), name='register'),
    path('account/', views.AccountView.as_view(), name='account'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
    # path('register/company/', views.RegisterCompanyView.as_view(),
    #      name='registerCompany'),

]
