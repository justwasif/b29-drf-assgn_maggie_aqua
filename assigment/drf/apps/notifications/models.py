from django.db import models

# Create your models here.
from apps.common.models import TimeStampe
from apps.common.constants import Notification

from apps.users.models import User
from apps.projects.models import (project,projectMember,Task,StageApproval,Stage)

from apps.discussions.models import Comment


class Notification(TimeStampe):
    reciver=models.ForeignKey(User,on_delete=models.CASCADE)
    sender=models.ForeignKey(User,on_delete=models.CASCADE)
    type=models.CharField(max_length=50,choices=Notification)
    title=models.CharField(max_length=50)
    message=models.TextChoices()
    is_read=models.BooleanField(default=False)
    project = models.ForeignKey(project,on_delete=models.CASCADE)
    task = models.ForeignKey(Task,on_delete=models.CASCADE)
    stage = models.ForeignKey(Stage,on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment,on_delete=models.CASCADE,)
    stage_proposal = models.ForeignKey(StageApproval,on_delete=models.CASCADE)

   

    def __str__(self):
        return self.title
