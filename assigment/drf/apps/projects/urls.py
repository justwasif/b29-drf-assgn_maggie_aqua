from django.urls import path, include
from .views import ProjectViewSet, TaskViewSet, StageViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='projects')
router.register('tasks', TaskViewSet, basename='tasks')
router.register('stages', StageViewSet, basename='stages')

urlpatterns = [
    path('', include(router.urls)),
]