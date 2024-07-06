from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app1.urls')),  # Asegúrate de que 'app' es el nombre de tu aplicación
]
