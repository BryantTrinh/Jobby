from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.models import Job
from jobby.serializer import JobSerializer



# get all jobs in database
@api_view(['GET', 'POST'])
def job_view(request):

    if request.method == 'GET':
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = get_data_from_body(request.body);
        # return Response(status.HTTP_200_OK)




# def get