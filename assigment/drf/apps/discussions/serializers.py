from rest_framework import serializers
from .models import Discussion_Thread, Comment

class DiscussionThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion_Thread
        fields = ['id', 'stage', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'thread', 'user', 'message', 'created_at', 'updated_at']
        read_only_fields = ['user']