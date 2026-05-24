from django.db import models
from apps.common.models import TimeStampe
from apps.users.models import User

class Notification(TimeStampe):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.email}"

