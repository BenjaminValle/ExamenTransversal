#Proyecto1\app1\forms.py 
from django import forms
from .models import Cliente
from django.contrib.auth.hashers import make_password

class ClienteForm(forms.ModelForm):
    password1 = forms.CharField(widget=forms.PasswordInput(), label='Contraseña')
    password2 = forms.CharField(widget=forms.PasswordInput(), label='Confirmar Contraseña')

    class Meta:
        model = Cliente
        fields = ['nombre', 'ap_paterno', 'ap_materno', 'email', 'direccion', 'ciudad', 'comuna', 'fono', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(ClienteForm, self).__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            self.add_error('password2', "Las contraseñas no coinciden.")

    def save(self, commit=True):
        cliente = super().save(commit=False)
        cliente.password = make_password(self.cleaned_data["password1"])
        if commit:
            cliente.save()
        return cliente
    
class CambiarContrasenaForm(forms.Form):
    password1 = forms.CharField(widget=forms.PasswordInput, label='Nueva Contraseña')
    password2 = forms.CharField(widget=forms.PasswordInput, label='Confirmar Nueva Contraseña')

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Las contraseñas no coinciden")

        return cleaned_data