"""Settings for Development Server"""
from angular.settings.base import *

DEBUG = True

VAR_ROOT = 'var/www/angular'
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
DIR_ARRAY = os.path.split(BASE_DIR)
PROJECT_ROOT = DIR_ARRAY[0]
print(PROJECT_ROOT)
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')
STATIC_URL = '/static/'

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'static'),
)
MEDIA_ROOT = os.path.join(VAR_ROOT, 'uploads')
#STATIC_ROOT = os.path.join(VAR_ROOT, 'static')
#STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DATABASES = {
    'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
            'NAME': 'd96s1asano5p2s',                      # Or path to database file if using sqlite3.
            # The following settings are not used with sqlite3:
            'USER': 'bfhhkfjddexayh',
            'PASSWORD': 'MCplNsmir_132-l075SpMRbE3f',
            'HOST': 'ec2-50-16-238-141.compute-1.amazonaws.com',                      # Empty for localhost through domain sockets or           '127.0.0.1' for localhost through TCP.
            'PORT': '5432',                      # Set to empty string for default.
        },
}
# WSGI_APPLICATION = 'plan.wsgi.dev.application'