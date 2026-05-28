from django.db import models

from apps.common.models import TimeStampe
from apps.common.constants import NOTIFICATION

from apps.users.models import User
from apps.projects.models import (project,Task,StageApproval,Stage)

from apps.discussions.models import Comment


class Notification(TimeStampe):
    receiver=models.ForeignKey(User,on_delete=models.CASCADE, related_name='received_notifications')
    sender=models.ForeignKey(User,on_delete=models.CASCADE, related_name='sent_notifications')
    type=models.CharField(max_length=50,choices=NOTIFICATION)
    title=models.CharField(max_length=50)
    message=models.TextField()
    is_read=models.BooleanField(default=False)
    project = models.ForeignKey(project,on_delete=models.CASCADE, null=True, blank=True)
    task = models.ForeignKey(Task,on_delete=models.CASCADE, null=True, blank=True)
    stage = models.ForeignKey(Stage,on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment,on_delete=models.CASCADE, null=True, blank=True)
    stage_proposal = models.ForeignKey(StageApproval,on_delete=models.CASCADE, null=True, blank=True)

   

    def __str__(self):
        return self.title
