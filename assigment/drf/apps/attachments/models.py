from django.db import models
from apps.common.models import TimeStampe
from apps.users.models import User
from apps.projects.models import Task

# Create your models here.
class Task_Attachment(TimeStampe):
    task=models.ForeignKey(Task,on_delete=models.CASCADE)
    uploaded_by=models.ForeignKey(User,on_delete=models.CASCADE)
    description=models.TextField()
    file_url=models.CharField(max_length=2000)
