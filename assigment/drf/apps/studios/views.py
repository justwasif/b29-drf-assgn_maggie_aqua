from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from apps.studios.models import Studio, StudioMembership
from apps.studios.serializers import StudioSerializer, StudioMembershipSerializer
from apps.users.permissions import IsAdmin, IsProjectLeadorAdmin, IsClientReadOnly, IsTeamMember


class StudioViewSet(viewsets.ModelViewSet):
    queryset = Studio.objects.all()
    serializer_class = StudioSerializer
    permission_classes = [IsClientReadOnly]  

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class StudioMembershipViewSet(viewsets.ModelViewSet):
    serializer_class = StudioMembershipSerializer
    permission_classes = [IsClientReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['studio']

    def get_queryset(self):
        return StudioMembership.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# Create your views here.
