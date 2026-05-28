from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import project, Task, Stage, projectMember, StageApproval
from .serializers import ProjectSerializer, TaskSerializer, StageSerializer, ProjectMemberSerializer, StageApprovalSerializer
from apps.users.permissions import IsProjectLeadorAdmin, IsClientReadOnly, IsReviewer, IsTeamMember
from apps.studios.models import Studio, StudioMembership


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectLeadorAdmin]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return project.objects.none()
        if user.role == 'admin':
            return project.objects.all()
        studio_ids = StudioMembership.objects.filter(user=user).values_list('studio_id', flat=True)
        return project.objects.filter(studio__in=studio_ids).distinct()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsClientReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['project', 'stage', 'assigned_to']
    search_fields = ['title', 'description']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Task.objects.none()
        if user.role == 'admin':
            return Task.objects.all()
        studio_ids = StudioMembership.objects.filter(user=user).values_list('studio_id', flat=True)
        return Task.objects.filter(project__studio__in=studio_ids).distinct()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    permission_classes = [IsClientReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Stage.objects.none()
        if user.role == 'admin':
            return Stage.objects.all()
        studio_ids = StudioMembership.objects.filter(user=user).values_list('studio_id', flat=True)
        return Stage.objects.filter(project__studio__in=studio_ids).distinct()


class ProjectMemberViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectMemberSerializer
    permission_classes = [IsProjectLeadorAdmin]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return projectMember.objects.none()
        if user.role == 'admin':
            return projectMember.objects.all()
        studio_ids = StudioMembership.objects.filter(user=user).values_list('studio_id', flat=True)
        return projectMember.objects.filter(project__studio__in=studio_ids).distinct()


class StageApprovalViewSet(viewsets.ModelViewSet):
    serializer_class = StageApprovalSerializer
    permission_classes = [IsReviewer]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['stage']

    def get_queryset(self):
        return StageApproval.objects.all()

    def perform_create(self, serializer):
        serializer.save(proposed_by=self.request.user)