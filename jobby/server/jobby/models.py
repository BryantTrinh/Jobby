from django.db import models

from .enums import PaymentType

# name and abbrev
class State(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    abbrev = models.CharField(max_length=255, blank = False, unique=True)
    def __str__(self):
        return str(self.name)
    
class PaymentType(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)

    # To make migrations create table with name payment_type
    class Meta:
        db_table = 'jobby_payment_type'
    def __str__(self):
        return str(self.name)

class Job(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    company = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True)
    requirements = models.TextField(null=True)
    salary_start = models.FloatField(null=True, default=None);
    salary_end = models.FloatField(null=True, default=None);
    # payment_type = models.CharField(null = True, default=None, choices=[(member.value, member.name) for member in PaymentType])
    applied = models.DateField(null=True)
    url = models.TextField(null=False, blank=False, default=None, unique=True)
    city = models.TextField(null=True, default=None)
    state = models.ForeignKey(
        State,
        on_delete=models.CASCADE,
        blank = False
    )
    payment_type = models.ForeignKey(
        PaymentType,
        on_delete=models.CASCADE,
        null = True,
        blank = True,
        default = None
    )
    def __str__(self):
        return "{title} - {company}, {state.name}"
    