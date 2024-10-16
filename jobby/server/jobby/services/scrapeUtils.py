
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver import ChromeOptions
import json

# given a url, convert link to soup Beautiful soup using selenium
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


# Given text from Google gemini, remove all unneed chars and convert object to json
def parseJson(text):
    # clean u ` chars from response
    cleanIterationOne = text.replace('```json', '')
    cleanIterationTwo =  cleanIterationOne.replace('`', '')
    try:
        json_object = json.loads(cleanIterationTwo)
        return json_object
    except json.JSONDecodeError:
        print("Invalid Json Format")