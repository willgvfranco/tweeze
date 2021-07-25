import os
from pathlib import Path
from .settings import *
from decouple import config
from django.contrib.messages import constants

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', cast=bool)


ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [
                       s.strip() for s in v.split(',')])


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': '5432'
    }
}


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

SITE_ID = 2

LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
CRISPY_TEMPLATE_PACK = 'bootstrap4'

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/


STATIC_URL = '/static/'
STATIC_ROOT = str(BASE_DIR / 'static')
MEDIA_URL = '/media/'
MEDIA_ROOT = str(BASE_DIR / 'media')
STATICFILES_DIRS = [
    str(BASE_DIR / 'templates/static')
]


SECURE_HSTS_SECONDS = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
# SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = 'SAMEORIGIN'


INSTALLED_APPS += ('admin_honeypot', 'bootstrap4', 'frontend', 'dashboard', 'perfil',
                   'axes',  'crispy_forms', 'django.contrib.humanize',   'django.contrib.sites', 'rest_framework',  'rest_registration',  'corsheaders','allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',)

MIDDLEWARE += ('axes.middleware.AxesMiddleware','corsheaders.middleware.CorsMiddleware',)

CORS_ORIGIN_ALLOW_ALL = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_REGISTRATION = {
    'REGISTER_VERIFICATION_ENABLED': False,
    'REGISTER_EMAIL_VERIFICATION_ENABLED': False,
    'RESET_PASSWORD_VERIFICATION_ENABLED': False,
}
# VIEW.PY => messages.success(self.request, 'Success!') // from django.contrib import messages
# Template.html => {% include "partials/_messages.html" %}
MESSAGE_TAGS = {
    constants.ERROR: 'alert-danger',
    constants.WARNING: 'alert-warning',
    constants.INFO: 'alert-info',
    constants.SUCCESS: 'alert-success',
    constants.DEBUG: 'alert-info',
}

AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesBackend',
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]


# Sessão em dias: 60s * 60m * 24h * 1d
SESSION_COOKIE_AGE = 60 * 60 * 24 * 7

# Salvar a cada requisição
SESSION_SAVE_EVERY_REQUEST = False

# Serializer - Padrão JSON
# SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'

# Para sessions em arquivos ao invés da base de dados
# SESSION_ENGINE = "django.contrib.sessions.backends.file"
# SESSION_FILE_PATH = '/home/metrolia/Desktop/temp'


AXES_FAILURE_LIMIT = 10

AXES_ENABLED = False
# python manage.py axes_reset
