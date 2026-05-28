ROLES = (
    ('ADMIN', 'Admin'),
    ('PROJECT_LEAD', 'Project Lead'),
    ('WRITER', 'Writer'),
    ('REVIEWER', 'Reviewer'),
    ('CLIENT_VIEWER', 'Client Viewer'),
    ('DESIGNER', 'Designer'),
)

STAGE_CHOICES = (
    ("DRAFT", "Draft"),
    ("REVIEW", "Review"),
    ("REVISION", "Revision"),
    ("APPROVED", "Approved"),
    ("COMPLETED", "Completed"),
)

NOTIFICATION= (
    ("Comment", "Comment"),
    ("Task", "Task"),
    ("Stage", "Stage Moved"),
    ("Deadline", "Deadline"),
)