from rest_framework import serializers
from .models import Task_Attachment

class TaskAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_Attachment
        fields = ['id', 'task', 'uploaded_by', 'description', 'file_url', 'created_at', 'updated_at']
        read_only_fields = ['uploaded_by']
