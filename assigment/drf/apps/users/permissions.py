from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role.upper() == 'ADMIN'

class IsProjectLeadorAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role.upper() in ['PROJECT_LEAD', 'ADMIN']    

class IsReviewer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role.upper() in ['REVIEWER', 'ADMIN','PROJECT_LEAD']

class IsTeamMember(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role.upper() in ['WRITER', 'REVIEWER', 'DESIGNER', 'PROJECT_LEAD', 'ADMIN']

class IsClientReadOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.role.upper() == 'CLIENT':
            return request.method in SAFE_METHODS
        return True