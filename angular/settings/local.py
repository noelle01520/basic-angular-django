"""Settings for Development Server"""
from angular.settings.base import *

DEBUG = True

VAR_ROOT = '/var/www/angular'
MEDIA_ROOT = os.path.join(VAR_ROOT, 'uploads')
STATIC_ROOT = os.path.join(VAR_ROOT, 'static')

DATABASES = {
    'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
            'NAME': 'angular',                      # Or path to database file if using sqlite3.
            # The following settings are not used with sqlite3:
            'USER': 'angular',
            'PASSWORD': 'angular',
            'HOST': 'localhost',                      # Empty for localhost through domain sockets or           '127.0.0.1' for localhost through TCP.
            'PORT': '',                      # Set to empty string for default.
        },
}
# WSGI_APPLICATION = 'plan.wsgi.dev.application'