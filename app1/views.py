from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

TEMPLATE_DIRS = (
    'os.path.join(BASE_DIR, "templates"),'
)

def index(request):
    return render(request, 'index.html')

def couch(request):
    return render(request, 'couch.html')

def cursos(request):
    return render(request, 'cursos.html')

def peleadores(request):
    return render(request, 'peleadores.html')

def tienda(request):
    return render(request, 'tienda.html')

