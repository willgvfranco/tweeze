from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='index'),
    path('busca/', views.NoticiaBusca.as_view(), name='busca'),
    path('landing/', views.LandingPageView.as_view(), name='landingPage'),
    # path('<int:contato_id>', views.ver_contato, name='ver_contato')
]
