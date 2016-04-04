from django.conf.urls import include, url

from rest_framework import routers

from .views import AccountViewSet, IndexView, LoginView, LogoutView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
urlpatterns = [
    #'',

    # API
    url(r'^api/v1/', include(router.urls), name='accounts'),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^.*$', IndexView.as_view(), name='index')
]