# Test examples

This is a sample project of automating different testing tyes.
It's divided into 3 parts:
1. Website testing 
2. REST API testing
3. Load testing

## Website testing
### Scope
Website testing part includes selected automated test cases for webpage [http://automationpractice.multiformis.com/](http://automationpractice.multiformis.com/).

### Technologies
The framework used for test automation is [Webdriver.io](https://webdriver.io/) with [Mocha](https://mochajs.org/) test framework included. 

### How to run
To run locally, you need to have [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

1. Open terminal 
2. Navigate to website_testing folder
3. Run command "npx wdio run ./wdio.conf.js"
4. Follow the wizard:
- Where is your automation backend located: On my local machine
- Which framework do you want to use: mocha
- Do you want to use the compiler: no
- Where are your test specs located: press Enter
- Do you want WebdriverIO to autogenerate some test files? n
- Which reporter do you want to use? timeline
- Do you want to add a plugin to your test setup? press Enter
- Do you want to add a service to your test setup? press Enter
- Do you want me to run npm install? n
5. Run command again: "npx wdio run ./wdio.conf.js"
6. Find the results in results/timeline-report.hmtl


### Results
Test results are printed in HTML report using [Timeline Reporter](https://webdriver.io/docs/wdio-timeline-reporter/) package. This is an example of a [test report](). 

Currently 2 tests (001_search and 002_sorting) are failing due to bugs.

### Test documentation
The test documentation is available [here](). It includes the test cases definition and test flows that are part of this project. Please note this is only a sample of all possible test cases and flows and doesn't provide sufficient coverage of all basic functionalities.

## REST api testing
### Scope
REST api testing part includes selected automated test cases for [Food data central API](https://fdc.nal.usda.gov/api-guide.html).

### Technologies
The tool used for REST api test automation is [Postman](https://www.postman.com/).

### How to run
1. Import [this collection]() into Postman. 
2. Click ... on the collection and select "Run collection"
3. Click "Run Food data" button

### Test documentation
The test documentation is available [here](https://github.com/Shugenya/testing_examples/blob/master/website_testing/docs/Test%20documentation.pdf).

## LOAD testing
### Scope
Load testing part includes load test for [Blaze demo](https://blazedemo.com) web application. 
More details about this load test can be found [here](https://github.com/Shugenya/testing_examples/blob/master/load_testing/README.md).

### Technologies
The tool used for Load testing is [k6](https://k6.io/docs/). 

### How to run
To run locally, you need to have k6 installed. See [instructions](https://k6.io/docs/getting-started/installation/).

1. Open terminal 
2. Navigate to load_testing folder
3. Run command: "k6 run script.js"
4. The result is printed in the terminal
