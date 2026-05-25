from django.db import models
from apps.common.models import TimeStampe
from apps.projects.models import Task

class Attachment(TimeStampe):
    task=models.ForeignKey(Task,on_delete=models.CASCADE,related_name='attachments')
    label=models.CharField(max_length=100)

    def __str__(self):
        return self.label