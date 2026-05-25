from rest_framework import serializers
from .models import project, Task, Stage

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = project
        fields = ['id', 'studio', 'title', 'description', 'created_by', 'lead_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'project', 'title', 'description', 'priority', 'deadline', 'stage', 'assigned_to', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by']

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ['id', 'project', 'name', 'order', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by']