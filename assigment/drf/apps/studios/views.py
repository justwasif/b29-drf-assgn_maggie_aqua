from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from apps.studios.models import (Studio,StudioMembership)
from apps.studios.serializers import (StudioSerializer,StudioMembershipSerializer) 
from apps.users.permissions import (IsAdmin,IsProjectLeadorAdmin,IsClientReadOnly,IsReviewer,IsTeamMember)

class StudioViewSet(viewsets.ModelViewSet):
    queryset=Studio.objects.all()
    serializer_class=StudioSerializer
    Permission_classes=[IsAdmin,IsProjectLeadorAdmin]

    def perform_create(self, serializer):

        serializer.save(uploaded_by=self.request.user)

   

class StudioMembershipViewSet(viewsets.ModelViewSet):
    queryset=StudioMembership.objects.all()
    serializer_class=StudioMembershipSerializer
    permission_classes=[IsClientReadOnly,IsTeamMember,IsReviewer]


    




# Create your views here.
