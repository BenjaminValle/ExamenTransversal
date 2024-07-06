# Proyecto1\app1\urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Usa 'index' para la URL raíz
    path('couch/', views.couch, name='couch'),
    path('cursos/', views.cursos, name='cursos'),
    path('peleadores/', views.peleadores, name='peleadores'),
    path('tienda/', views.tienda, name='tienda'),
    path('perfil/', views.perfil_cliente, name='profile'),  # Vista para modificar datos del cliente    
    path('registro/', views.registro, name='registro'),
    path('login/', views.login_view, name='login'),
    path('compras/', views.ver_compras, name='compras'),
    path('logout/', views.logout_view, name='logout'),
    path('process_purchase/', views.process_purchase, name='process_purchase'),
]
