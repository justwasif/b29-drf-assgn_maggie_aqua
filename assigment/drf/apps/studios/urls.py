from django.urls import path,include
from rest_framework.routers import DefaultRouter
from apps.studios.views import (StudioViewSet,StudioMembershipViewSet)

router=DefaultRouter()
router.register('studio',StudioViewSet,basename='studio')
router.register('studiomember',StudioMembershipViewSet,basename='studiomember')

urlpatterns=[
    path('',include(router.urls)),
]