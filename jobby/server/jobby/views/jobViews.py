from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.models import Job, State, PaymentType
from jobby.serializer import JobSerializer
from django.db.models import Q
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from ..constants import REQUEST_PARAMS
from django.shortcuts import render
import json
import datetime

# get all jobs in database
@api_view(['GET', 'POST'])
def job_view(request):

    if request.method == 'GET':
        # Get query parameters
        query = Q()

        job_title = request.GET.get(REQUEST_PARAMS['JOB_TITLE'], None)
        state = request.GET.get(REQUEST_PARAMS['STATE'], None)
        company = request.GET.get(REQUEST_PARAMS['COMPANY'], None)
        city = request.GET.get(REQUEST_PARAMS['CITY'], None)

        if job_title:
            query &= Q(title__icontains=job_title)
        if state:
            query &= (Q(state__name__iexact=state) | Q(state__abbrev__iexact=state))
        if company:
            query &= Q(company__icontains=company)
        if city:
            query &= Q(city__icontains=city)

        order_by = request.GET.get(REQUEST_PARAMS['ORDER_BY'], 'desc')
        # default sort by is applied date
        sort_by = request.GET.get(REQUEST_PARAMS['SORT_BY'], 'applied')

        jobs = Job.objects.filter(query).order_by(sort_by if order_by == 'asc' else '-' + sort_by)

        
        # set pagination paramers
        page_size = request.GET.get(REQUEST_PARAMS['PAGE_SIZE'], 10)
        page_index = request.GET.get(REQUEST_PARAMS['PAGE_INDEX'], 1)
        
        paginator = Paginator(jobs, page_size)

        try:
            page = paginator.get_page(page_index)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)

        serializer = JobSerializer(page, many=True)

        paginatonResponse = {
            'page_index': page.number,
            'page_size': int(page_size),
            'total_elements': paginator.count,
            'total_pages': paginator.num_pages,
            'sort_by': sort_by,
            'order_by': order_by,
            'data': serializer.data,
        }
        return Response(paginatonResponse, status=status.HTTP_200_OK)
        # return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        body = None
        try:
            body = get_data_from_body(request.body);
        except Exception as e:
            return Response({'message': f'Error invalid request: {e}'}, status=status.HTTP_400_BAD_REQUEST)
        # check db by url
        if Job.objects.filter(url=body.get('url')).exists():
            return Response({'message': 'Job with this url already exists'}, status=status.HTTP_400_BAD_REQUEST)
        state_obj = None
        # get state object from db
        state_obj = State.objects.get(Q(name__iexact=body.get('state')) | Q(abbrev__iexact=body.get('state')))
        if state_obj == None:
            return Response({'message': 'Invalid state name/abbrev'}, status=status.HTTP_400_BAD_REQUEST)
        
        # payment type object
        payment_type_obj = None
        if body.get('payment_type') != None:
            payment_type_obj, created = PaymentType.objects.get_or_create(
                name = body.get('payment_type')
            )

        salary_start = None
        salary_end = None
        if body.get('salary_start') is not None:
            salary_start = body.get('salary_start').replace(',', '')
        if body.get('salary_end') is not None:
            salary_end = body.get('salary_end').replace(',', '')
            
        try:
            salary_start = float(salary_start)
            salary_end = float(salary_end)
        except ValueError as e:
            return Response({'message': 'Invalid salary start/end values - ' + e}, status=status.HTTP_400_BAD_REQUEST)
        
        now = datetime.date.today()

        # save to db

        newJob = Job.objects.create(
            title=body.get('job_title'), 
            company = body.get('company'),
            description = body.get('job_description'),
            requirements = '\n'.join(body.get('job_requirements')),
            salary_start = salary_start,
            salary_end = salary_end,
            payment_type = payment_type_obj,
            applied = now,
            url = body.get('url'),
            city = body.get('city'),
            state = state_obj
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
    
    missingFields = []
    # required fields: job title, company, url, state,
    if 'job_title' not in data:
        missingFields.append('job_title')
    if 'company' not in data:
        missingFields.append('company')
    if 'state' not in data:
        missingFields.append('state')
    if 'url' not in data:
        missingFields.append('url')

    if len(missingFields) > 0:
        raise Exception(f'Following fields are missing in body: {', '.join(missingFields)}');
    return data
