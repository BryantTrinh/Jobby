from django.db import models

# name and abbrev
class State(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    abbrev = models.CharField(max_length=255, blank = False, unique=True)
    def __str__(self):
        return str(self.name)
    


class Job(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    company = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True)
    requirements = models.TextField(null=True)
    salary = models.FloatField(null=True)
    applied = models.DateField(null=True)
    url = models.TextField(null=False, blank=False, default=None)
    state = models.ForeignKey(
        State,
        on_delete=models.CASCADE,
        blank = False
    )
    def __str__(self):
        return "{title} - {company}, {state.name}"