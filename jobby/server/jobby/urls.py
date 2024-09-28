# Defines endpoints for our api logic

from django.urls import path
from .views import get_all_states, populate_state_database


# specifies the url patterns
# add this url to urls located in project folder in order for project to recognize this url
urlpatterns = [
    path('states/', get_all_states, name='getAllStates'),
    path('states/create', populate_state_database, name='createStates')
]