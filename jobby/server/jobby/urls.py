# Defines endpoints for our api logic

from django.urls import path
from jobby.views.stateViews import get_all_states, populate_state_database
from jobby.views.jobViews import job_view
from jobby.views.scrapeViews import scrape_by_url
from jobby.views.jobDetailViews import job_detail
from jobby.views.paymentTypeViews import get_all_payment_types



# specifies the url patterns
# add this url to urls located in project folder in order for project to recognize this url
urlpatterns = [
    path('states/', get_all_states, name='getAllStates'),
    path('states/create/', populate_state_database, name='createStates'),
    path('jobs/', job_view, name='jobView'),
    path('jobs/<pk>/', job_detail, name='jobDetails'),
    path('scrape/', scrape_by_url, name="scrapeByUrl"),
    path('payment/type/', get_all_payment_types, name='getAllPaymentTypes')
]