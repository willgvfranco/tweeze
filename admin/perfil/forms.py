from django import forms
from django.core.mail.message import EmailMessage
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from . import models


class PerfilForm(forms.ModelForm):
    class Meta:
        model = models.Perfil
        fields = '__all__'
        exclude = ('usuario',)


class UserForm(forms.ModelForm):
    password = forms.CharField(
        required=False,
        widget=forms.PasswordInput(),
        label='Senha',
        help_text="No mínimo 6 caracteres"
    )
    password2 = forms.CharField(
        required=False,
        widget=forms.PasswordInput(),
        label='Confirmação da Senha'
    )

    def __init__(self, usuario=None, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.usuario = usuario

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username',
                  'password', 'password2', 'email')

    def clean(self, *args, **kwargs):
        data = self.data
        cleaned = self.cleaned_data
        validation_error_msgs = {}

        # usuario_data = data['username']
        # password_data = data['password']
        # email_data = data['email']

        # usuario_data = cleaned.get('username')
        usuario_data = cleaned.get('email')
        email_data = cleaned.get('email')
        password_data = cleaned.get('password')
        password2_data = cleaned.get('password2')

        usuario_db = User.objects.filter(username=usuario_data).first()
        email_db = User.objects.filter(username=email_data).first()

        error_msg_user_exists = 'Usuário já existe'
        error_msg_email_exists = 'Email já existe'
        error_msg_password_match = 'Senha não confere'
        error_msg_password_short = 'Senha menor que 6 caracteres'
        error_msg_required_field = 'Este campo é obrigatório.'

        # logado
        if self.usuario:
            if usuario_db:
                if usuario_data != usuario_db.username:
                    validation_error_msgs['username'] = error_msg_user_exists

            if email_db:
                if email_data != email_db.email:
                    validation_error_msgs['email'] = error_msg_email_exists

            if password_data:
                if password_data != password2_data:
                    validation_error_msgs['password'] = error_msg_password_match
                    validation_error_msgs['password2'] = error_msg_password_match

                if len(password_data) < 6:
                    validation_error_msgs['password'] = error_msg_password_short

        # nao logados
        else:
            if usuario_db:
                validation_error_msgs['username'] = error_msg_user_exists

            if email_db:
                validation_error_msgs['email'] = error_msg_email_exists

            if not password_data:
                validation_error_msgs['password'] = error_msg_required_field

            if not password2_data:
                validation_error_msgs['password2'] = error_msg_required_field

            if password_data != password2_data:
                validation_error_msgs['password'] = error_msg_password_match
                validation_error_msgs['password2'] = error_msg_password_match

            if len(password_data) < 6:
                validation_error_msgs['password'] = error_msg_password_short

        if validation_error_msgs:
            raise(forms.ValidationError(validation_error_msgs))

# class RegisterCompanyForm(forms.Form):
#     company = forms.CharField(max_length=255, label="Nome")
#     cnpj = forms.CharField(max_length=18, label="CPF")
#     number_access = forms.IntegerField(
#         label="Quantas pessoas tem acesso à conta")
#     line_of_business = forms.CharField(max_length=255, label="Ramo de atuação")


# class PositiveClippingForm(forms.Form):
#     clipping_list = forms.CharField(max_length=255, label="Termos positivos")


# class NegativeClippingForm(forms.Form):
#     clipping_list = forms.CharField(max_length=255, label="Termos negativos")


# class CompanyForm(forms.Form):
#     name = forms.CharField(max_length=255, label="Nome")
#     cnpf = forms.CharField(max_length=255, label="CNPJ")
#     num_of_users = forms.IntegerField(
#         label="Quantas Pessoas tem acesso à conta")
#     line_of_business = forms.CharField(max_length=255, label="Ramo de atuação")


class LoginForm(forms.Form):
    login = forms.CharField(max_length=255, label="Login")
    password = forms.CharField(max_length=18, label="Password")
