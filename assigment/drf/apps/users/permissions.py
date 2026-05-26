from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'ADMIN'

class IsProjectLeadorAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role in ['PROJECT_LEAD', 'ADMIN']    

class IsReviewer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['REVIEWER', 'ADMIN','PROJECT_LEAD']

class IsTeamMember(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['WRITER', 'REVIEWER', 'DESIGNER', 'PROJECT_LEAD', 'ADMIN']

class IsClientReadOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.role == 'CLIENT':
            return request.method in SAFE_METHODS
        return True