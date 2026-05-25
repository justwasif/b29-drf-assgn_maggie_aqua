from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import project
from .serializers import ProjectSerializer
from .task_serializers import TaskSerializer
from .models import Task
from apps.users.permissions import IsProjectLeadorAdmin, IsClientReadOnly


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectLeadorAdmin]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsClientReadOnly]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['project', 'stage', 'assigned_to']
    search_fields = ['title', 'description']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
  