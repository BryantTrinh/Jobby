from django.db import models

from .enums import PaymentType

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
    salary_start = models.FloatField(null=True, default=None);
    salary_end = models.FloatField(null=True, default=None);
    payment_type = models.CharField(null = True, default=None, choices=[(member.value, member.name) for member in PaymentType])
    applied = models.DateField(null=True)
    url = models.TextField(null=False, blank=False, default=None, unique=True)
    state = models.ForeignKey(
        State,
        on_delete=models.CASCADE,
        blank = False
    )
    city = models.TextField(null=True, default=None)
    def __str__(self):
        return "{title} - {company}, {state.name}"
    