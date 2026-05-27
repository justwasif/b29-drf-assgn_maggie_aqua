from rest_framework import viewsets
from .models import Notification
from .serializers import NotificationSerializer
from apps.users.permissions import IsClientReadOnly, IsReviewer, IsTeamMember

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(receiver=self.request.user).order_by('-created_at')
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
    permission_classes = [IsTeamMember]