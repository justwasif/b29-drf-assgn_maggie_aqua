from rest_framework import serializers
from .models import project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = project
        fields = ['id', 'studio', 'title', 'description', 'created_by', 'lead_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by']