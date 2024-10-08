# Website parsers
from urllib.parse import urlparse, parse_qs
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import environ

import os          
from dotenv import load_dotenv, find_dotenv
from pathlib import Path

# takes in url {string} and returns json object of job details
def parseWebsite(url):
    websiteSet = set([
        "www.indeed.com",
        "www.linkedin.com"
    ])

    urlComponents = urlparse(url)
    print(urlComponents.netloc)
    if urlComponents.netloc in websiteSet:
        if urlComponents.netloc == 'www.indeed.com':
            parseIndeed(url, urlComponents)
        elif urlComponents.netloc == 'www.linkedin.com':
            parseLinkedIn(url, urlComponents)
    # else:
        # Do other parsing



def parseIndeed(url, urlComponents):
    webResponse = requests.get(url)
    soup = BeautifulSoup(webResponse.text, 'html.parser')
    data = soup.text

    jobDetails = soup.find(id='jobDetailsSection')
    print(jobDetails)
    # print('parse indeed site')



def parseLinkedIn(url, urlComponents):
    print('parse linkedin site')
    print(urlComponents)

    queryDict = parse_qs(urlComponents.query)
    print(queryDict)
    if 'currentJobId' in queryDict:
        print('parse from linkedin job list')
    else:
        print('parse from linked job details')


def llm_function(query):
    # response = model.generate_content(query);
    # return response.to_dict
    return

# for testing
if __name__ == '__main__':
    

    BASE_DIR = Path(__file__).resolve().parent.parent
    envFile = os.path.join(BASE_DIR, '.env')
    load_dotenv(envFile)
    print(os.getenv('GOOGLE_APY_KEY'))
    # key = os.environ['GOOGLE_API_KEY']

    # parseWebsite('https://www.indeed.com/jobs?q=software+engineer&l=Remote&sort=date&explvl=mid_level&ts=1728338452752&pts=1728153144267&sc=0kf%3Aattr%28EVPJU%7CJB2WC%7CNGEEK%7CWD7PP%252COR%29explvl%28MID_LEVEL%29%3B&from=searchOnHP&rq=1&rsIdx=0&fromage=last&vjk=404fea78bab6aa12')

    # parseWebsite('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4041180884')

    # parseWebsite('https://www.linkedin.com/jobs/view/4041180884/?alternateChannel=search&refId=a9aDr%2FE8Jzz%2BiAjzfkIrYA%3D%3D&trackingId=84J8W82CAexB5l%2BUsz1TTA%3D%3D')
