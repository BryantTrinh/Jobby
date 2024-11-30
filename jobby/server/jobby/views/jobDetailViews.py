
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.models import Job
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
        # get state
        
        serializer = JobSerializer(job, request.data)
        # check if serializer is valid after serializing the data
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        # if errors, return errors and send 400 status code
        else:
          print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_200_OK)