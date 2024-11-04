# Contains api logic
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.models import State
from jobby.serializer import StateSerializer
# Create your views here.


# Endpoint to get all states
@api_view(['GET']) 
def get_all_states(request):

    states = State.objects.all()
    serializer = StateSerializer(states, many=True)
    return Response(serializer.data)


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
    newStates = [];
    for state in states:
        try:
            stateObj = State.objects.get(name=state['name'])
        except State.DoesNotExist:
            stateObj = State(name=state['name'], abbrev=state['abbrev'])
            newStates.append(stateObj);
    if len(newStates) > 0:
        # bulk create for single create transaction
        State.objects.bulk_create(newStates);
        return Response({'message': 'Successfully added states in database'}, status=status.HTTP_200_OK)
    return Response({'message': 'Database contains all states'}, status=status.HTTP_200_OK);