# Contains api logic
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.models import PaymentType
from jobby.serializer import PaymentTypeSeralizer
# Create your views here.


# Endpoint to get all states
@api_view(['GET']) 
def get_all_payment_types(request):
    states = PaymentType.objects.all()
    serializer = PaymentTypeSeralizer(states, many=True)
    return Response(serializer.data)
