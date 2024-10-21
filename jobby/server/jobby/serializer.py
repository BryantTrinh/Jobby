from rest_framework import serializers
from .models import State, Job

# Used to serialize models into objects

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['name', 'abbrev']

class JobSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='title')
    job_description = serializers.CharField(source='description')
    job_requirements = serializers.CharField(source='requirements')
    state = StateSerializer()

    class Meta:
        model = Job
        fields = ['job_title', 'company', 'job_description', 'job_requirements', 'salary', 'state', 'city', 'applied', 'url']