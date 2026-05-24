from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'project', 'title', 'description', 'stage', 'assigned_to', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by']