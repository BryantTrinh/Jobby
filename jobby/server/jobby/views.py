# Contains api logic
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import State, Job
from .serializer import StateSerializer, JobSerializer
# Create your views here.


# Endpoint to get all states
@api_view(['GET']) 
def get_all_states(request):

    # fake data
    states = [
        {'name': 'California', 'abbrev': 'CA'},
        {'name': 'Nevada', 'abbrev': 'NV'},
        {'name': 'Oregon', 'abbrev': 'OR'},
        {'name': 'Washington', 'abbrev': 'WA'},
        {'name': 'Remote', 'abbrev': 'REM'},
    ]

    stateReponse = [];

    for state in states:
        stateReponse.append(StateSerializer(state).data);

    return Response(stateReponse);
    # return Response(StateSerializer({'name': 'California', 'abbrev': 'CA'}).data)

@api_view(['POST'])
def populate_state_database(request):
    states =  [
        {'name': 'Alabama', 'abbrev': 'AL'},
        {'name': 'Alaska', 'abbrev': 'AK'},
        {'name': 'Arizona', 'abbrev': 'AZ'},
        {'name': 'Arkansas', 'abbrev': 'AR'},
        {'name': 'California', 'abbrev': 'CA'},
        {'name': 'Colorado', 'abbrev': 'CO'},
        {'name': 'Connecticut', 'abbrev': 'CT'},
        {'name': 'Delaware', 'abbrev': 'DE'},
        {'name': 'District Of Columbia', 'abbrev': 'DC'},
        {'name': 'Florida', 'abbrev': 'FL'},
        {'name': 'Georgia', 'abbrev': 'GA'},
        {'name': 'Hawaii', 'abbrev': 'HI'},
        {'name': 'Idaho', 'abbrev': 'ID'},
        {'name': 'Illinois', 'abbrev': 'IL'},
        {'name': 'Indiana', 'abbrev': 'IN'},
        {'name': 'Iowa', 'abbrev': 'IA'},
        {'name': 'Kansas', 'abbrev': 'KS'},
        {'name': 'Kentucky', 'abbrev': 'KY'},
        {'name': 'Louisiana', 'abbrev': 'LA'},
        {'name': 'Maine', 'abbrev': 'ME'},
        {'name': 'Maryland', 'abbrev': 'MD'},
        {'name': 'Massachusetts', 'abbrev': 'MA'},
        {'name': 'Michigan', 'abbrev': 'MI'},
        {'name': 'Minnesota', 'abbrev': 'MN'},
        {'name': 'Mississippi', 'abbrev': 'MS'},
        {'name': 'Missouri', 'abbrev': 'MO'},
        {'name': 'Montana', 'abbrev': 'MT'},
        {'name': 'Nebraska', 'abbrev': 'NE'},
        {'name': 'Nevada', 'abbrev': 'NV'},
        {'name': 'New Hampshire', 'abbrev': 'NH'},
        {'name': 'New Jersey', 'abbrev': 'NJ'},
        {'name': 'New Mexico', 'abbrev': 'NM'},
        {'name': 'New York', 'abbrev': 'NY'},
        {'name': 'North Carolina', 'abbrev': 'NC'},
        {'name': 'North Dakota', 'abbrev': 'ND'},
        {'name': 'Ohio', 'abbrev': 'OH'},
        {'name': 'Oklahoma', 'abbrev': 'OK'},
        {'name': 'Oregon', 'abbrev': 'OR'},
        {'name': 'Pennsylvania', 'abbrev': 'PA'},
        {'name': 'Rhode Island', 'abbrev': 'RI'},
        {'name': 'South Carolina', 'abbrev': 'SC'},
        {'name': 'South Dakota', 'abbrev': 'SD'},
        {'name': 'Tennessee', 'abbrev': 'TN'},
        {'name': 'Texas', 'abbrev': 'TX'},
        {'name': 'Utah', 'abbrev': 'UT'},
        {'name': 'Vermont', 'abbrev': 'VT'},
        {'name': 'Virginia', 'abbrev': 'VA'},
        {'name': 'Washington', 'abbrev': 'WA'},
        {'name': 'West Virginia', 'abbrev': 'WV'},
        {'name': 'Wisconsin', 'abbrev': 'WI'},
        {'name': 'Wyoming', 'abbrev': 'WY'},
        {'name': 'Remote', 'abbrev': 'REM'}
    ]

    # check database if exists, if it doesnt, create
    for state in states:
        try:
            stateObj = State.objects.get(name=state['name'])
        except State.DoesNotExist:
            stateObj = State(name=state['name'], abbrev=state['abbrev'])
            stateObj.save();

    return Response({'message': 'Successfully populated states in database'}, status=status.HTTP_200_OK)