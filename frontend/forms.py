from django import forms
from django.core.mail.message import EmailMessage


class ContatoForm(forms.Form):
    nome = forms.CharField(max_length=255, label="Nome")
    email = forms.EmailField(max_length=255, label="Email")
    assunto = forms.CharField(max_length=255, label="Assunto")
    mensagem = forms.CharField(label="mensagem", widget=forms.Textarea())

    def send_mail(self):
        nome = self.cleaned_data['nome']
        email = self.cleaned_data['email']
        assunto = self.cleaned_data['assunto']
        mensagem = self.cleaned_data['mensagem']

        conteudo = f'Nome: {nome}\nE-mail: {email}\nAssunto: {assunto}\nMensagem: {mensagem}'

        mail = EmailMessage(
            subject=assunto,
            body=conteudo,
            from_email='williamgvfranco@gmail.com',
            to=['williamgvfranco@gmail.com'],
            headers={'Reply-To': email}
        )

        mail.send()
