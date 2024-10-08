from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Set up the WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open LinkedIn Jobs page
driver.get('https://www.linkedin.com/jobs/')



# Allow time for the page to load
time.sleep(5)

# Find job listings elements
job_listings = driver.find_elements(By.CLASS_NAME, 'job-card-container')

company_names = []

for job in job_listings:
    try:
        # Extract company name from each job listing
        company_name = job.find_element(By.CLASS_NAME, 'job-card-container__company-name').text
        company_names.append(company_name)
    except Exception as e:
        print(f"Error extracting company name: {e}")

# Print extracted company names
for name in company_names:
    print(name)

# Close the driver
driver.quit()