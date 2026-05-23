from django.db import models
from apps.common.models import TimeStampe
from apps.common.constants import (ROLES,STAGE_CHOICES)
from apps.studios.models import Studio
from apps.users.models import User

# Create your models here.
class project(TimeStampe):
    studio=models.ForeignKey(Studio,on_delete=models.CASCADE)
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=50)
    created_by=models.ForeignKey(User,on_delete=models.CASCADE)
    lead_by=models.ForeignKey(User,on_delete=models.CASCADE)
    current_stage=models.ForeignKey(Stage,on_delete=models.CASCADE)
    def __str__(self):
        return self.title

class projectMember(TimeStampe):
    project=models.ForeignKey(project,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    role=models.CharField(max_length=50,choices=ROLES)

    def __str__(self):
        return f"{self.user.email} - {self.project.title}"


class Stage(TimeStampe):
    project=models.ForeignKey(project,on_delete=models.CASCADE)
    stage=models.CharField(max_length=50,choices=STAGE_CHOICES)

    def __str__(self):
        return self.stage
    
class Task(TimeStampe):
    project=models.ForeignKey(project,on_delete=models.CASCADE)
    stage=models.ForeignKey(Stage,on_delete=models.CASCADE,default='Draft')
    title=models.CharField(max_length=100)
    description=models.TextField()
    created_by=models.ForeignKey(User,on_delete=models.CASCADE)
    assigned_to=models.ForeignKey(User,on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    
# apps/projects/models.py

from django.db import models

from apps.common.models import TimeStampedModel
from apps.common.constants import (
    ROLE_CHOICES,
    TASK_PRIORITY,
    APPROVAL_STATUS,
)

from apps.users.models import User
from apps.studios.models import Studio



class Project(TimeStampedModel):
    studio = models.ForeignKey(
        Studio,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_projects"
    )

    lead = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="leading_projects"
    )

    due_date = models.DateTimeField(
        null=True,
        blank=True
    )

    tags = models.ManyToManyField(
        Tag,
        blank=True,
        related_name="projects"
    )

    current_stage = models.ForeignKey(
        "Stage",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="active_projects"
    )

    def __str__(self):
        return self.title


class ProjectMember(TimeStampedModel):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="members"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="project_memberships"
    )

    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES
    )

    class Meta:
        unique_together = ("project", "user")

    def __str__(self):
        return f"{self.user.email} - {self.project.title}"


class Stage(TimeStampedModel):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="stages"
    )

    label = models.ForeignKey(
        StageLabel,
        on_delete=models.PROTECT,
        related_name="stages"
    )

    order = models.PositiveIntegerField()

    started_at = models.DateTimeField(
        null=True,
        blank=True
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.project.title} - {self.label.name}"


class Task(TimeStampedModel):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="tasks"
    )

    stage = models.ForeignKey(
        Stage,
        on_delete=models.CASCADE,
        related_name="tasks"
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_tasks"
    )

    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_tasks"
    )

    priority = models.CharField(
        max_length=20,
        choices=TASK_PRIORITY,
        default="MEDIUM"
    )

    due_date = models.DateTimeField(
        null=True,
        blank=True
    )

    is_completed = models.BooleanField(default=False)

    tags = models.ManyToManyField(
        Tag,
        blank=True,
        related_name="tasks"
    )

    def __str__(self):
        return self.title


class StageApproval(TimeStampedModel):
    stage = models.ForeignKey(
        Stage,
        on_delete=models.CASCADE,
     
    )

    proposed_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    approved_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        
    )
    status = models.CharField(
        max_length=50,
        choices=APPROVAL_STATUS,
        default="PENDING"
    )

  

   

   

    def __str__(self):
        return f"{self.stage} - {self.status}"
    

