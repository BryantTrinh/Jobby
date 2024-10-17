from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from jobby.services.webScrapingService import parse_website

@api_view(['GET'])
def scrape_by_url(request):
    # Extracting the 'url' parameter from the query parameters in the GET request
    url = request.query_params.get('url', None)
    
    # Checking if the 'url' parameter is provided
    if url is None:
        return Response({'message': 'No URL provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    print(f'Getting data from {url}')
    
    # Parsing the website using the provided URL
    try:
        jobDict = parse_website(url)
    except Exception as e:
        return Response({'message': f'Error scraping the website: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Returning the parsed job data
    return Response(data=jobDict, status=status.HTTP_200_OK)