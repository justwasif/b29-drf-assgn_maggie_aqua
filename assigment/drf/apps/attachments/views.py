from rest_framework import viewsets
from .models import Attachment
from .serializers import AttachmentSerializer
from django_filters.rest_framework import DjangoFilterBackend

class AttachmentViewSet(viewsets.ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['task']
