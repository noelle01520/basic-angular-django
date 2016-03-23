"""Settings for Development Server"""
from angular.settings.base import *

DEBUG = True

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