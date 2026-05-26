from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import project
from .serializers import ProjectSerializer, TaskSerializer, StageSerializer
from .models import Task, Stage, project
from apps.users.permissions import IsProjectLeadorAdmin, IsClientReadOnly
from apps.studios.models import Studio, StudioMembership


class ProjectViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return project.objects.none()
        if user.role == 'ADMIN':
            return project.objects.all()
        # Get studios where the user is a member
        studio_ids = StudioMembership.objects.filter(user=user).values_list('studio_id', flat=True)
        # Get projects in those studios
        return project.objects.filter(studio__in=studio_ids).distinct()
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectLeadorAdmin]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Task.objects.none()
        if user.role == 'ADMIN':
            return Task.objects.all()
        # Get studios where the user is a member
        studio_ids = StudioMembership.objects.filter(user=user).values_list('studio_id', flat=True)
        # Get tasks in those studios
        return Task.objects.filter(project__studio__in=studio_ids).distinct()
    serializer_class = TaskSerializer
    permission_classes = [IsClientReadOnly]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['project', 'stage', 'assigned_to']
    search_fields = ['title', 'description']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class StageViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Stage.objects.none()
        if user.role == 'ADMIN':
            return Stage.objects.all()
        # Get studios where the user is a member
        studio_ids = StudioMembership.objects.filter(user=user).values_list('studio_id', flat=True)
        # Get stages in those studios
        return Stage.objects.filter(project__studio__in=studio_ids).distinct()
    serializer_class = StageSerializer
    permission_classes = [IsClientReadOnly]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
  