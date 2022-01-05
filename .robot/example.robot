*** Settings ***
Documentation     Demo Robot Framework
Library           Selenium2Library
Library           Collections
Library           RequestsLibrary

*** Variables ***
${BASE_URL}     http://localhost:8080
${BROWSER}      Chrome

*** Test Cases ***
Valid Root Path
    [Tags]    get       root
    Create Session      tsxample            ${BASE_URL}
    ${resp}=            GET On Session      tsxample        /
    Status Should Be    200                 ${resp}
    
Post Json Request Test
    [Tags]      post       mirror
    ${data}=    Create dictionary      title=Robotframework requests  body=This is a test!  userId=1
    ${resp}=    POST On Session        tsxample     /mirror     json=${data}        expected_status=anything
    Status Should Be    200                 ${resp}