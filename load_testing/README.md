# Load test example project

### Test description
This load test checks the performance of [Blaze demo](https://blazedemo.com) web application using HTTP requests. 
The test consists of setup phase and load phase. 

**Setup phase:**
In setup phase the test measures the web app response time before executing any load. This baseline response time is saved as 'response_time_before' metric and included in the test report.

**Load phase:**
In the load phase the tests sends http requests simulating 1000 virtual users in 15 seconds. The test report is printed in the console output at the end of test execution and contains various performance metrics. 
The 'http_req_duration' metric measures web application response time during load test.
The 'response_time_before' metric measures web application response time before test.

### Test execution
The test was repeated 5 times. The results were following:

|  #  | Response time (before) | Avg. Response time | Avg. Success. Resp. time | Max. Response time | Requests failed |
| --- | ---------------------- | ------------------ | ------------------------ | ------------------ | --------------- |
|  1  |       234.7489 ms      |       2.48 s       |           2.77 s         |      20.18 s       |     10.88%      |
|  2  |       230.9296 ms      |       2.35 s       |           2.66 s         |      22.23 s       |     11.68%      |
|  3  |       240.5319 ms      |       2.35 s       |           2.65 s         |      23.93 s       |     11.46%      |
|  4  |       295.0600 ms      |       2.33 s       |           2.64 s         |      26.33 s       |     11.51%      |
|  5  |       239.8209 ms      |       2.41 s       |           2.71 s         |      26.36 s       |     11.13%      |

### Test results interpretation 
The 3 key metrics that we observed were:
 - Average response time - average amount of time that passes between a user's request and response from server
 - Max response time - longest response time of all requests
 - Requests failed (Error rate) - percentage of failed requests compared to all requests

The load test had significant impact on the web application response time.

The response time before test was from 230 ms to 295 ms. The average response time of a successful request during load test was ranging from 2.64 to 2.77s which is not an acceptable response time for a modern-day application. 
The optimal application response time for modern-day web application is under 200ms and acceptable but not optimal is under 1s.
The maximal response times was always above 20s which is not acceptable considering the fact that users tend to close applications that take more than few seconds to load.

The requests failed percentage was constantly bigger than 10% which indicates that the web application isn't able to handle the given load. This means that this load test with given load configuration actually became a stress test.  