from rest_framework import serializers
from .models import State, Job, PaymentType

# Used to serialize models into objects

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['name', 'abbrev']

class PaymentTypeSeralizer(serializers.ModelSerializer):
    class Meta:
        model = PaymentType
        fields = ['name']

class JobSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='title')
    job_description = serializers.CharField(source='description')
    job_requirements = serializers.CharField(source='requirements')
    state = StateSerializer()
    payment_type = serializers.SlugRelatedField(
        many = False,
        read_only = True,
        slug_field = "name"
    )
    # payment_type = PaymentTypeSeralizer()
    
    class Meta:
        model = Job
        fields = ['id', 'job_title', 'company', 'job_description', 'job_requirements', 'salary_start', 'salary_end', 'payment_type', 'state', 'city', 'applied', 'url']