import http from 'k6/http';
import { check } from "k6";
import { Counter } from 'k6/metrics';

const URL = 'https://blazedemo.com';
const responseTimeCounter = new Counter('response_time_before', true);

export const options = {
  vus: 1000,
  duration: '15s',
};

export function setup() {
  const res = http.get(URL);
  check(res, {
    "is status 200": (r) => r.status === 200
  });

  //Save response time before test
  const duration = res.timings.duration;
  responseTimeCounter.add(duration);
  console.log('Response time before running: ' + String(duration) + ' ms');

}

export default function () {
  const res = http.get(URL);
  check(res, {
    "is status 200": (r) => r.status === 200
  });
}