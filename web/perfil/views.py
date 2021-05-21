from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import TemplateView
from django.http import HttpResponse
# Create your views here.
from django.contrib import messages
from django.views.generic import View, FormView
from .forms import PerfilForm, UserForm, LoginForm
from django.urls import reverse_lazy
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from . import models
from . import forms
# Create your views here.


class LoginView(FormView):
    template_name = 'login.html'
    form_class = LoginForm
    success_url = reverse_lazy('login')

    def get_context_data(self, **kwargs):
        context = super(LoginView, self).get_context_data(**kwargs)

        return context


class RegisterView(FormView):
    template_name = 'register.html'

    def setup(self, *args, **kwargs):
        super().setup(*args, **kwargs)

        # self.carrinho = copy.deepcopy(self.request.session.get('carrinho'))

        self.perfil = None

        # if self.request.user.is_authenticated:
        #     self.perfil = models.Perfil.objects.filter(
        #         usuario=self.request.user
        #     ).first()

        #     self.contexto = {
        #         'userform': forms.UserForm(
        #             data=self.request.POST or None,
        #             usuario=self.request.user,
        #             instance=self.request.user,
        #         ),
        #         'perfilform': forms.PerfilForm(
        #             data=self.request.POST or None,
        #             instance=self.perfil
        #         )
        #     }
        # else:
        self.contexto = {
            'userform': forms.UserForm(
                data=self.request.POST or None
            ),
            'perfilform': forms.PerfilForm(
                data=self.request.POST or None
            )
        }

        self.userform = self.contexto['userform']
        self.perfilform = self.contexto['perfilform']

        # if self.request.user.is_authenticated:
        #     self.template_name = 'account.html'

        self.renderizar = render(
            self.request, self.template_name, self.contexto)

    def get(self, request, *args, **kwargs):
        return self.renderizar


class Criar(RegisterView):
    def post(self, request, *args, **kwargs):
        print(self.perfil)

        if not self.userform.is_valid() or not self.perfilform.is_valid():
            messages.error(
                self.request,
                'Existem erros no formulário de cadastro. Verifique se todos '
                'os campos foram preenchidos corretamente.'
            )

            return self.renderizar

        username = self.userform.cleaned_data.get('username')
        password = self.userform.cleaned_data.get('password')
        email = self.userform.cleaned_data.get('email')
        first_name = self.userform.cleaned_data.get('first_name')
        last_name = self.userform.cleaned_data.get('last_name')

        usuario = self.userform.save(commit=False)
        usuario.set_password(password)
        usuario.save()

        perfil = self.perfilform.save(commit=False)
        perfil.usuario = usuario
        perfil.save()

        # if password:
        #     autentica = authenticate(
        #         self.request,
        #         username=usuario,
        #         password=password
        #     )

        #     if autentica:
        #         login(self.request, user=usuario)

        # self.request.session['carrinho'] = self.carrinho
        # self.request.session.save()

        messages.success(
            self.request,
            'Seu cadastro foi criado com sucesso.'
        )

        # messages.success(
        #     self.request,
        #     'Você fez login.'
        # )

        return redirect('dashboard:home')


class AccountView(TemplateView):
    template_name = 'account.html'

    def get_context_data(self, **kwargs):
        context = super(AccountView, self).get_context_data(**kwargs)
        context['segment'] = 'account'

        return context


class Atualizar(AccountView):
    template_name = 'account.html'

    def setup(self, *args, **kwargs):
        super().setup(*args, **kwargs)

        self.perfil = None

        if self.request.user.is_authenticated:
            self.perfil = models.Perfil.objects.filter(
                usuario=self.request.user
            ).first()

            self.contexto = {
                'userform': forms.UserForm(
                    data=self.request.POST or None,
                    usuario=self.request.user,
                    instance=self.request.user,
                ),
                'perfilform': forms.PerfilForm(
                    data=self.request.POST or None,
                    instance=self.perfil
                )
            }
        else:
            return redirect('perfil:home')

        self.userform = self.contexto['userform']
        self.perfilform = self.contexto['perfilform']

        # if self.request.user.is_authenticated:
        #     self.template_name = 'account.html'

        self.renderizar = render(
            self.request, self.template_name, self.contexto)

    def get(self, request, *args, **kwargs):
        return self.renderizar


class Login(View):
    def post(self, *args, **kwargs):
        username = self.request.POST.get('username')
        password = self.request.POST.get('password')

        if not username or not password:
            messages.error(
                self.request,
                'Preencha usuário e senha.'
            )
            # print('erro1')
            return redirect('perfil:home')

        usuario = authenticate(
            self.request, username=username, password=password)

        if not usuario:
            messages.error(
                self.request,
                'Usuário ou senha inválidos.'
            )
            # print('erro2')

            return redirect('perfil:home')

        login(self.request, user=usuario)

        messages.success(
            self.request,
            'Você fez login no sistema.'
        )
        # print('god')

        return redirect('dashboard:home')


class Logout(View):
    def get(self, request, *args, **kwargs):
        logout(self.request)

        return redirect('frontend:landingpage')
