# Defines endpoints for our api logic

from django.urls import path
from jobby.views.stateViews import get_all_states, populate_state_database
from jobby.views.jobViews import get_all_jobs, job_detail


# specifies the url patterns
# add this url to urls located in project folder in order for project to recognize this url
urlpatterns = [
    path('states/', get_all_states, name='getAllStates'),
    path('states/create/', populate_state_database, name='createStates'),
    path('jobs/', get_all_jobs, name='getAllJobs'),
    path('jobs/<pk>/', job_detail, name = 'jobDetails')
]