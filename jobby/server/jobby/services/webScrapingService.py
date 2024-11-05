
from urllib.parse import urlparse, parse_qs
import google.generativeai as genai
import os          
from dotenv import load_dotenv
from pathlib import Path
from .scrapeUtils import linkToSoup_selenium, parseJson

# Load env file from jobby/server/server/.env
BASE_DIR = Path(__file__).resolve().parent.parent.parent
envFile = os.path.join(BASE_DIR, 'server', '.env')
load_dotenv(envFile)
GOOGLE_API_KEY = os.getenv('GOOGLE_APY_KEY')

# configure google gemini
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# takes in url {string} and returns json object of job details
def parse_website(url):

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
    
    queryDict = parse_qs(urlComponents.query)
    jobDict = None
    if urlComponents.netloc in websiteSet:
        if urlComponents.netloc == 'www.indeed.com':
            jobDict = parse_indeed(url, queryDict, soup)
        elif urlComponents.netloc == 'www.linkedin.com':
            jobDict = parse_linkedIn(url, queryDict)
    # else:
    #     Do other parsing
    return jobDict



def parse_indeed(url, queryDict, soup):
    htmlText = None
    if 'vjk' in queryDict:
        # parse from jobList
        jobData = soup.find(id='jobsearch-ViewjobPaneWrapper')
        if jobData is None:
            raise Exception(f"Error getting html contents for {url}")
        htmlText = jobData.text
        
    else:
        # parse from job details
        jobInfo = soup.find('div', class_='jobsearch-InfoHeaderContainer')
        jobDetails = soup.find(id='jobDetailsSection')
        jobLocation = soup.find(id='jobDetailsSection')
        jobDescription = soup.find(id='jobDescriptionText')

        htmlText = jobInfo.text + jobDetails.text + jobLocation.text + jobDescription.text

    if htmlText is not None:
        query = "Create a json object with the following fields extracted from the data: job_title as string, company as string, job_description (including any responsibilities) as string, state as string, city as string, salary_start and salary_end as string (include both if salary range is provided else only include salary_end), payment_type as string (only yearly or hourly), job_requirements as an array of strings from the HTML element " + htmlText
        apiResponse = llm_function(query);
        jobDict = parseJson(apiResponse.candidates[0].content.parts[0].text)
        # add url to dict
        jobDict['url'] = url
        return jobDict



def parse_linkedIn(url, queryDict):
    print('parse linkedin site')

    print(queryDict)
    if 'currentJobId' in queryDict:
        print('parse from linkedin job list')
    else:
        print('parse from linked job details')

def llm_function(query):
    response = model.generate_content(query);
    return response

# for testing
# if __name__ == '__main__':

#     for line in sys.path:
#         print(line)
#     print(GOOGLE_API_KEY)
#     # # parse from job list
#     # parse_website('https://www.indeed.com/jobs?q=software+engineer&l=Remote&sc=0kf%3Aattr%28EVPJU%7CJB2WC%7CNGEEK%7CWD7PP%252COR%29%3B&from=searchOnDesktopSerp&vjk=dcd58daeb24cdbda&advn=1237621172012789')

#     # # parse from job details
#     # parse_website('https://www.indeed.com/viewjob?jk=27d9d63f723eccc8&q=software+engineer&l=Remote&tk=1i9sad68bi023816&from=web&advn=9656130729393009&adid=437268302&ad=-6NYlbfkN0DgaN-HpXIqjvu5EzBtjgqLFI86fHlVkW4KWJhOZyoyA8VV2iWf7cPiDeWS_G-FQ74gilsZEzbPkGGgdR_Iqwc6Axlu2C_-eDlDk8_3doE036IYhgrdH-Kv74myxfK_blOdL5ENoxMp8pVa7qJYwNUhBOjvaofCduU9NMixhKZ9DiQicVWZNtt55NgyxAmvN0DaqI1WghKvbWXyPqRj_GExenjMqh40H4PaJ8wI2NYKOsj3S2Ie_oA4f3DCgiMGL9rKsWzFH_El3XhrpvJodM8mAbj8xrhnqT6C-c_KsBCAS_QUqxiimwLzou4VmXwpUmafLJRMNhG9qm8gyNVBMOAkidmWR6hE2jiHJE6tm7ihumSnj2E_wVhCqG0VMFVNEYrUXLMb9QugBN7ZguQYO8bFR8njM2PYj3qaRrmtFcpJjyayy7GzV_GXlrk2tPg3TpSv5M0h9BqhvsQgGrcU7t8axs93-FtTf4uyagpoVD4QFOiG5sklGiWPaoJAnTwNXrwX1F_TJ-CfNKdehXqdL60v&pub=4a1b367933fd867b19b072952f68dceb&camk=nUmJqO2E8rjNfblg4Prjlw%3D%3D&xkcb=SoBy6_M378c7FKTxYR0LbzkdCdPP&xpse=SoBZ6_I378c5nxzxaR0PbzkdCdPP&xfps=98a845cd-954e-44a6-8594-4978ece3ea5f&vjs=3')
#     # parse_website('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4041180884')

#     # parse_website('https://www.linkedin.com/jobs/view/4041180884/?alternateChannel=search&refId=a9aDr%2FE8Jzz%2BiAjzfkIrYA%3D%3D&trackingId=84J8W82CAexB5l%2BUsz1TTA%3D%3D')