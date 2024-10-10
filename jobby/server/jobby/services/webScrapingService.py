
from urllib.parse import urlparse, parse_qs
import google.generativeai as genai
import os          
from dotenv import load_dotenv
from pathlib import Path
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver import ChromeOptions
import json

# Load env file from jobby/server/server/.env
BASE_DIR = Path(__file__).resolve().parent.parent.parent
envFile = os.path.join(BASE_DIR, 'server', '.env')
load_dotenv(envFile)
GOOGLE_API_KEY = os.getenv('GOOGLE_APY_KEY')

# configure google gemini
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# takes in url {string} and returns json object of job details
def parseWebsite(url):

    # initalize google

    websiteSet = set([
        "www.indeed.com",
        "www.linkedin.com"
    ])

    urlComponents = urlparse(url)
    print(urlComponents.netloc)

    soup = linkToSoup_selenium(url, isv=True, returnErr=False)
    if not soup:
        print('Error getting soup')
        return
    
    if urlComponents.netloc in websiteSet:
        if urlComponents.netloc == 'www.indeed.com':
            parseIndeed(url, urlComponents, soup)
        elif urlComponents.netloc == 'www.linkedin.com':
            parseLinkedIn(url, urlComponents)
    # else:
        # Do other parsing


def parseIndeed(url, urlComponents, soup):

    jobData = soup.find(id='jobsearch-ViewjobPaneWrapper')
    # print(jobData)

    query = "Create an object with the following fields extracted from the data: job_title as string, company as string, job_description as string, job_location as string, salary as string, job_requirements as array of strings from the HTML element " + jobData.text 

    apiResponse = llm_function(query);
    jobDict = parseJson(apiResponse.candidates[0].content.parts[0].text)
    print(jobDict)
    return jobDict



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
    response = model.generate_content(query);
    return response



# helper functions
def linkToSoup_selenium(lUrl, tmout=None, fparser='html.parser', isv=True, returnErr=False):
    try:
        # I copy chromedriver.exe to the same folder as this py file
        options = ChromeOptions()
        options.add_argument("--headless=old")
        user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.90 Safari/537.36'
        options.add_argument(f'user-agent={user_agent}')
        driver = webdriver.Chrome(options=options)
        driver.maximize_window()
        driver.get(lUrl)
        if type(tmout) in [int, float]: time.sleep(tmout) 
 
        lSoup = BeautifulSoup(driver.page_source, fparser)
        driver.close()
        del driver  # (just in case)
        return lSoup
    except Exception as e:
        if isv: print(str(e))   ## set isv=False to suppress error message ##
        return str(e) if returnErr else None


def parseJson(text):
    # clean u ` chars from response
    removedChars = text.replace('`', '')
    try:
        json_object = json.loads(removedChars)
        return json_object
    except json.JSONDecodeError:
        print("Invalid Json Format")
# for testing
if __name__ == '__main__':
    
    print(GOOGLE_API_KEY)
    parseWebsite('https://www.indeed.com/jobs?q=software+engineer&l=Remote&sc=0kf%3Aattr%28EVPJU%7CJB2WC%7CNGEEK%7CWD7PP%252COR%29%3B&from=searchOnDesktopSerp&vjk=dcd58daeb24cdbda&advn=1237621172012789')

    # parseWebsite('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4041180884')

    # parseWebsite('https://www.linkedin.com/jobs/view/4041180884/?alternateChannel=search&refId=a9aDr%2FE8Jzz%2BiAjzfkIrYA%3D%3D&trackingId=84J8W82CAexB5l%2BUsz1TTA%3D%3D')