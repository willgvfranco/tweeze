from django import forms
from django.core.mail.message import EmailMessage
from django.core.validators import RegexValidator


class ContatoForm(forms.Form):
    email = forms.EmailField(max_length=255, label="Email")
    # code = forms.CharField(max_length=3, label="DD1")
    phone = forms.CharField(max_length=18, label="Telefone")

    def send_mail(self):
        email = self.cleaned_data['email']
        # code = self.cleaned_data['code']
        phone = self.cleaned_data['phone']

        # conteudo = f'Telefone: {code}{phone}\nE-mail: {email}'
        conteudo = f'Telefone: {phone}\nE-mail: {email}'

        mail = EmailMessage(
            subject='teste',
            body=conteudo,
            from_email='williamgvfranco@gmail.com',
            to=['williamgvfranco@gmail.com'],
            headers={'Reply-To': email}
        )

        # mail.send()
        print(mail)

class LoginForm(forms.Form):
    login = forms.CharField(max_length=255, label="Login")
    password = forms.CharField(max_length=18, label="Password")


