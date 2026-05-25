from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskAttachmentViewSet

router = DefaultRouter()
router.register('attachments', TaskAttachmentViewSet, basename='attachments')

urlpatterns = [
    path('', include(router.urls)),
]