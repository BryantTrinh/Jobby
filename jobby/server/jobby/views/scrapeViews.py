from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from jobby.services.webScrapingService import parse_website
import json

@api_view(['GET']) 
def scrape_by_url(request):
    data = None
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'message': 'Error parsing json'}, status=status.HTTP_400_BAD_REQUEST);
    
    if(data == None or data['url'] == None):
        print('Getting data from ' + data['url'])
        return Response({'message': 'No url found'}, status=status.HTTP_400_BAD_REQUEST);
    url = data['url'];
    jobDict = parse_website(url);
    return Response(data=jobDict, status=status.HTTP_200_OK)