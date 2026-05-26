from rest_framework import viewsets
from .models import Task_Attachment
from .serializers import TaskAttachmentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from apps.users.permissions import IsClientReadOnly

class TaskAttachmentViewSet(viewsets.ModelViewSet):
    queryset = Task_Attachment.objects.all()
    serializer_class = TaskAttachmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['task']
    permission_classes = [IsClientReadOnly]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
