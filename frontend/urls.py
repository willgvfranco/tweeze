from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='index'),
    path('busca/', views.NoticiaBusca.as_view(), name='busca'),
    # path('<int:contato_id>', views.ver_contato, name='ver_contato')
]
