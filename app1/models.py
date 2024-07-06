# Proyecto1\app1\models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class ClienteManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Cliente(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(max_length=100)
    ap_paterno = models.CharField(max_length=100)
    ap_materno = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=100)
    comuna = models.CharField(max_length=100)
    fono = models.CharField(max_length=15)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = ClienteManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'ap_paterno', 'ap_materno', 'direccion', 'ciudad', 'comuna', 'fono']

    def __str__(self):
        return f"{self.nombre} {self.ap_paterno} {self.ap_materno}"

# Modelo de Registro de Ventas (Sin Registro)
class VentaSinRegistro(models.Model):
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=200)
    email = models.EmailField()
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=100)
    comuna = models.CharField(max_length=100)
    fono = models.CharField(max_length=15)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    cantidad_articulos = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Venta sin registro: {self.nombre} {self.apellidos} - {self.fecha_compra}"

# Modelo de Registro de Ventas (Con Registro)
class VentaConRegistro(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    cantidad_articulos = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Venta con registro: {self.cliente.email} - {self.fecha_compra}"

# Modelo de Detalle de Ventas (para ambos casos)
class DetalleVenta(models.Model):
    venta_sin_registro = models.ForeignKey(VentaSinRegistro, null=True, blank=True, on_delete=models.CASCADE)
    venta_con_registro = models.ForeignKey(VentaConRegistro, null=True, blank=True, on_delete=models.CASCADE)
    nombre_articulo = models.CharField(max_length=255)
    cantidad = models.IntegerField()
    valor_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.CharField(max_length=255, blank=True)  # Nuevo campo para la imagen

    def __str__(self):
        return f"Detalle de Venta: {self.nombre_articulo} - {self.cantidad}"
