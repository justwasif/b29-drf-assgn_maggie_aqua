from django.db import models
from apps.common.models import TimeStampe
from apps.users.models import User
from apps.projects.models import (Task,Stage)

# Create your models here.
class Discussion_Thread(TimeStampe):
    stage = models.ForeignKey(
        Stage,
        on_delete=models.CASCADE,
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    def __str__(self):
        return f"Thread {self.id}"
    

class Comment(TimeStampe):
    thread = models.ForeignKey(
        Discussion_Thread,
        on_delete=models.CASCADE,
        related_name="comments"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
       
    )

    message = models.TextField()


    def __str__(self):
        return f"Comment by {self.user.email}"