from django.contrib import admin
from .models import project, Stage, Task, projectMember, StageApproval

# Register your models here.
admin.site.register(project)
admin.site.register(Stage)
admin.site.register(Task)
admin.site.register(projectMember)
admin.site.register(StageApproval)