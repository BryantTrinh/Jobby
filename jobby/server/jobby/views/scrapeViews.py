from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.services.webScrapingService import parse_website
import json

@api_view(['POST'])
def scrape_by_url(request):

    data = None
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError as e:
        return Response({'message': f'Error parsing json - {e}'}, status=status.HTTP_400_BAD_REQUEST);

    if(data == None or data['url'] == None):
        return Response({'message': 'No url found'}, status=status.HTTP_400_BAD_REQUEST);

    url = data['url']

    # Parsing the website using the provided URL
    try:
        jobDict = parse_website(url)
    except Exception as e:
        return Response({'message': f'Error scraping the website: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Returning the parsed job data
    return Response(data=jobDict, status=status.HTTP_200_OK)