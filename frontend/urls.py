from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='index'),
    path('busca/', views.NoticiaBusca.as_view(), name='busca'),
    path('landing/', views.LandingPageView.as_view(), name='landingPage'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('register/company/', views.RegisterCompanyView.as_view(), name='registerCompany'),
    path('register/positive-clipping/', views.PositiveClippingView.as_view(), name='positiveClipping'),
    path('register/negative-clipping/', views.NegativeClippingView.as_view(), name='negativeClipping'),
    # path('<int:contato_id>', views.ver_contato, name='ver_contato')
]
