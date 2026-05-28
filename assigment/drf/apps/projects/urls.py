from django.urls import path, include
from .views import ProjectViewSet, TaskViewSet, StageViewSet, ProjectMemberViewSet, StageApprovalViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='projects')
router.register('tasks', TaskViewSet, basename='tasks')
router.register('stages', StageViewSet, basename='stages')
router.register('projectmembers', ProjectMemberViewSet, basename='projectmembers')
router.register('stageapprovals', StageApprovalViewSet, basename='stageapprovals')

urlpatterns = [
    path('', include(router.urls)),
]