from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.models import Job, State
from jobby.serializer import JobSerializer
from django.db.models import Q
import json
import datetime

# get all jobs in database
@api_view(['GET', 'POST'])
def job_view(request):

    if request.method == 'GET':
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        body = None
        try:
            body = get_data_from_body(request.body);
        except Exception as e:
            return Response({'message': f'Error invalid request: {e}'}, status=status.HTTP_400_BAD_REQUEST)
        print(body.get('url'))
        # check db by url
        if Job.objects.filter(url=body.get('url')).exists():
            return Response({'message': 'Job with this url already exists'}, status=status.HTTP_400_BAD_REQUEST)
        stateObj = None
        # get state object from db
        stateObj = State.objects.get(Q(name__iexact=body.get('state')) | Q(abbrev__iexact=body.get('state')))
        if stateObj == None:
            return Response({'message': 'Invalid state name/abbrev'}, status=status.HTTP_400_BAD_REQUEST)
        

        now = datetime.date.today()

        # save to db

        newJob = Job.objects.create(
            title=body.get('job_title'), 
            company = body.get('company'),
            description = body.get('job_description'),
            requirements = body.get('job_requirements'),
            salary = body.get('salary'),
            applied = now,
            url = body.get('url'),
            city = body.get('city'),
            state = stateObj
        )
        serializer = JobSerializer(newJob)
        return Response(serializer.data, status.HTTP_200_OK)




def get_data_from_body(body):
    data = None
    try:
        data = json.loads(body)
    except json.JSONDecodeError as e:
        raise Exception( f'Error parsing json - {e}')

    if data == None:
        raise Exception('No data found')
    
    print(data)
    missingFields = []
    # required fields: job title, company, url, state,
    if 'job_title' not in data:
        print('no job title')
        missingFields.append('job_title')
    if 'company' not in data:
        print('no company')
        missingFields.append('company')
    if 'state' not in data:
        print('no state')
        missingFields.append('state')
    if 'url' not in data:
        print('no url')
        missingFields.append('url')

    if len(missingFields) > 0:
        raise Exception(f'Following fields are missing in body: {', '.join(missingFields)}');
    return data

# {
#     "job_title": "title",
#     "company": "comapny",
#     "state": "CA",
#     "url": "www.fakeurl.com"
# }