# Proyecto1\app1\views.py
import json

from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from .forms import ClienteForm, CambiarContrasenaForm
from .models import Cliente, VentaConRegistro, VentaSinRegistro, DetalleVenta

# Vista principal
def index(request):
    context = {
        'user_authenticated': request.user.is_authenticated,
    }
    return render(request, 'home.html', context)

# Vista para mostrar los entrenadores (coaches)
def couch(request):
    context = {
        'user_authenticated': request.user.is_authenticated,
    }
    return render(request, 'couch.html', context)

# Vista para mostrar los cursos
def cursos(request):
    context = {
        'user_authenticated': request.user.is_authenticated,
    }
    return render(request, 'cursos.html', context)

# Vista para mostrar los peleadores
def peleadores(request):
    context = {
        'user_authenticated': request.user.is_authenticated,
    }
    return render(request, 'peleadores.html', context)

# Vista para mostrar la tienda
def tienda(request):
    context = {
        'user_authenticated': request.user.is_authenticated,
    }
    return render(request, 'tienda.html', context)

def registro(request):
    if request.method == 'POST':
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            errors = form.errors.as_json()
            return JsonResponse({'success': False, 'errors': json.loads(errors)})
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)

@login_required
def perfil_cliente(request):
    cliente = request.user  # Utiliza directamente request.user
    if request.method == 'POST':
        cliente_form = ClienteForm(request.POST, instance=cliente)
        cambiar_contrasena_form = CambiarContrasenaForm(request.POST)

        if cliente_form.is_valid() and cambiar_contrasena_form.is_valid():
            cliente_form.save()
            # Cambiar contraseña si ambos campos coinciden
            password1 = cambiar_contrasena_form.cleaned_data.get('password1')
            cliente.set_password(password1)
            cliente.save()
            update_session_auth_hash(request, cliente)  # Mantener al usuario autenticado después del cambio de contraseña
            return redirect('perfil_cliente')
    else:
        cliente_form = ClienteForm(instance=cliente)
        cambiar_contrasena_form = CambiarContrasenaForm()

    return render(request, 'profile.html', {
        'cliente_form': cliente_form,
        'cambiar_contrasena_form': cambiar_contrasena_form
    })

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "errors": "Credenciales incorrectas"})
    return JsonResponse({"success": False, "errors": "Método no permitido"}, status=405)

@login_required
def ver_compras(request):
    compras = VentaConRegistro.objects.filter(cliente=request.user)
    return render(request, 'compras.html', {'compras': compras})

def logout_view(request):
    logout(request)
    return redirect('index')  # Redirige a la página principal después del logout

@csrf_exempt
def process_purchase(request):
    """
    Procesa la compra del carrito de compras.
    Si el usuario está autenticado, registra la venta con la cuenta del usuario.
    Si el usuario no está autenticado, registra la venta sin cuenta.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        if request.user.is_authenticated:
            # Procesar venta con registro
            cliente = request.user
            total = sum(item['valor_total'] for item in data['productos'])
            venta = VentaConRegistro.objects.create(
                cliente=cliente,
                cantidad_articulos=len(data['productos']),
                total=total
            )
            for item in data['productos']:
                DetalleVenta.objects.create(
                    venta_con_registro=venta,
                    nombre_articulo=item['nombre_articulo'],
                    cantidad=item['cantidad'],
                    valor_unitario=item['valor_unitario'],
                    valor_total=item['valor_total']
                )
        else:
            # Procesar venta sin registro
            total = sum(item['valor_total'] for item in data['productos'])
            venta = VentaSinRegistro.objects.create(
                nombre=data['nombre'],
                apellidos=data['apellidos'],
                email=data['email'],
                direccion=data['direccion'],
                ciudad=data['ciudad'],
                comuna=data['comuna'],
                fono=data['fono'],
                cantidad_articulos=len(data['productos']),
                total=total
            )
            for item in data['productos']:
                DetalleVenta.objects.create(
                    venta_sin_registro=venta,
                    nombre_articulo=item['nombre_articulo'],
                    cantidad=item['cantidad'],
                    valor_unitario=item['valor_unitario'],
                    valor_total=item['valor_total']
                )

        return JsonResponse({'success': True, 'message': 'Compra procesada con éxito.'})
    return JsonResponse({'success': False, 'message': 'Método no permitido.'}, status=405)
