# Proyecto1\app1\admin.py
from django.contrib import admin
from .models import Cliente, VentaSinRegistro, VentaConRegistro, DetalleVenta

# en este apartado se deben registrar todos lso modelos, esto lso hara visibles desde el panel de administracion
admin.site.register(Cliente)
admin.site.register(VentaSinRegistro)
admin.site.register(VentaConRegistro)
admin.site.register(DetalleVenta)
