from django.db import models

# Create your models here.
class TimeStampe(models.Model):
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)

    class Meta:
        abstract=True