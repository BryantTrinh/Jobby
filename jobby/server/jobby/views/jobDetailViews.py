
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.models import Job, State, PaymentType
from jobby.serializer import JobSerializer

# GET, PUT, DELETE methods for user details by pk (primary key)
@api_view(['GET', 'PUT', 'DELETE'])
def job_detail(request, pk):
    try:
        job = Job.objects.get(pk = pk)
    except Job.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        serializer = JobSerializer(job)
        return Response(serializer.data)
    
    elif request.method == 'PUT':

        # get state obj
        state_obj = State.objects.get(Q(name__iexact=request.data.get('state')) | Q(abbrev__iexact=request.data.get('state')))

        if state_obj == None:
            return Response({'message': 'Invalid state name/abbrev'}, status=status.HTTP_400_BAD_REQUEST)
        
        # payment option
        payment_type_obj = None
        if request.data.get('payment_type') != None:
            payment_type_obj, created = PaymentType.objects.get_or_create(
                name = request.data.get('payment_type')
            )

        # salary start/end
        salary_start = None
        salary_end = None
        if request.data.get('salary_start') != None:
            salary_start = request.data.get('salary_start')
            if isinstance(salary_start, float) == False and isinstance(salary_start, str) == True:
                salary_start = request.data.get('salary_start').replace(',', '').replace('$', '')
        if request.data.get('salary_end') != None:
            salary_end = request.data.get('salary_end')
            if isinstance(salary_end, float) == False and isinstance(salary_end, str) == True: 
                salary_end = request.data.get('salary_end').replace(',', '').replace('$', '')
            
        try:
            if salary_start is not None and isinstance(salary_start, float) == False:
              salary_start = float(salary_start)
            if salary_end is not None and isinstance(salary_end, float) == False:
              salary_end = float(salary_end)
        except ValueError as e:
            return Response({'message': 'Invalid salary start/end values - ' + e}, status=status.HTTP_400_BAD_REQUEST)

        job.title = request.data.get('job_title') or job.title
        job.company = request.data.get('company') or job.company
        job.description = request.data.get('job_description') or job.description
        job.requirements = request.data.get('job_requirements') or job.requirements
        job.salary_start = salary_start or job.salary_start
        job.salary_end = salary_end or job.salary_end
        job.payment_type = payment_type_obj or job.payment_type
        job.city = request.data.get('city') or job.city
        job.state = state_obj or job.state

        job.save()

        serializer = JobSerializer(job)

        return Response(serializer.data, status=status.HTTP_200_OK)
        # # check if serializer is valid after serializing the data
        # serializer = JobSerializer(job, data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data)
        # # if errors, return errors and send 400 status code
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # return Response(status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_200_OK)