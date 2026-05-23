ROLES={
    {'ADMIN',"Admin"},
    {'PROJECT_LEAD','project lead'},
    {'WRITER',"writer"},
    {"REVIEWER",'REVIEWRE'},
    {'CLIENT_VIEWER','client_viewer'},
    {"DESIGNER",'designer'}

}

STAGE_CHOICES = (
    ("DRAFT", "Draft"),
    ("REVIEW", "Review"),
    ("REVISION", "Revision"),
    ("APPROVED", "Approved"),
    ("COMPLETED", "Completed"),
)
Notification={
    {"Comment",'comment'},
    {"Task",'task'},
    {"Stage","stage_moved"},
    {'Deadline','deadline'},
}