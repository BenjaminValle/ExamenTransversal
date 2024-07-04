from django.urls import path
from .  import views 

urlpatterns = [ 
    path('', views.index, name='index'),
    path('couch/', views.couch, name='couch'),
    path('cursos/', views.cursos, name='cursos'),
    path('peleadores/', views.peleadores, name='peleadores'),
    path('tienda/', views.tienda, name='tienda'),
]