from django.db import models

# name and abbrev
class State(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    abbrev = models.CharField(max_length=255, blank = False, unique=True)
    def __str__(self):
        return str(self.name)
    


class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    state = models.ForeignKey(
        State,
        on_delete=models.PROTECT,
        blank = False
    )
    def __str__(self):
        return "{title} - {company}, {state.name}"