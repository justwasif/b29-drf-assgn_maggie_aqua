from django.db import models
from django.contrib.auth.models import AbstractUser

class UserRole(models.TextChoices):
    ADMIN = 'admin', 'Admin'
    PROJECT_LEAD = 'project_lead', 'Project Lead'
    DESIGNER = 'designer', 'Designer'
    WRITER = 'writer', 'Writer'
    REVIEWER = 'reviewer', 'Reviewer'
    CLIENT = 'client', 'Client'

class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=30, choices=UserRole.choices, default=UserRole.DESIGNER)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
