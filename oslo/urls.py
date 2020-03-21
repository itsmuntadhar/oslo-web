from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from filter import views as fv

router = routers.DefaultRouter()
router.register(r'users', fv.UserViewSet, basename='users')
router.register(r'words', fv.WordViewSet, basename='words')
# router.register(r'filter', fv.FilterViewSet, basename='filter')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/filter/', fv.FilterViewSet.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^(?:.*)\/', include('reactapp.urls')),
    # path('', include('reactapp.urls')),
    # path('about', include('reactapp.urls')),
    # path('login', include('reactapp.urls')),
    # path('logout', include('reactapp.urls')),
    # path('register', include('reactapp.urls')),
    # path('addword', include('reactapp.urls')),
]
