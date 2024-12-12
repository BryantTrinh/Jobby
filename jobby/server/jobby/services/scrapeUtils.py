
import os    
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver import ChromeOptions
from selenium.webdriver.common.by import By
from urllib.parse import urlparse
import json

USERNAME = os.getenv('USERNAME')
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
    
def linkToSoup_selenium_linkedIn(lUrl, tmout=None, fparser='html.parser', isv=True, returnErr=False):
    try:
        # I copy chromedriver.exe to the same folder as this py file
        options = ChromeOptions()
        # options.add_argument("--headless=old")
        user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.90 Safari/537.36'
        options.add_argument(f'user-agent={user_agent}')

        # HAVE TO CREATE A NEW COPY OF USER DATA FOLDER WHERE CHROME USER DATA IS STORED. IN THISE CASE, CREATED A COPY IN SAME DIRECTORY AND NAMED IT JOBBY. MUST BE LOGGED INTO LINKEDIN ON SECOND PRFILE
        options.add_argument("--user-data-dir=C:\\Users\\Richard\\AppData\\Local\\Google\\Chrome\\Jobby")
        # options.add_argument("user-data-dir=C:\\Users\\Richard\\AppData\\Local\\Google\\Chrome\\User Data")
        # options.add_argument("--user-data-dir=C:\\Users\\Richard\\Documents\\Chrome Profile")
        options.add_argument('--profile-directory=Profile 2')
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-gpu")
        options.add_argument("--disable-infobars")
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


def handle_login(redirect_url, driver, fparser='html.parser'):
    driver.get(redirect_url)
    time.sleep(15)
    
    loginSoup = BeautifulSoup(driver.page_source, fparser)

    print(loginSoup)

    # authwall-join-form__form-toggle--bottom form-toggle
    # driver.find_element_by_css_selector('.authwall-join-form__form-toggle--bottom.form-toggle').click()
    driver.find_elements(By.CLASS_NAME, '.nav__button-secondary btn-secondary-emphasis.btn-md').click()
    # driver.find_elements(By.CLASS_NAME, '.authwall-join-form__form-toggle--bottom.form-toggle').click()
    time.sleep(30)