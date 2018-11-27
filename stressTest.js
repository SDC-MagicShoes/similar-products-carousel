import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 200,
  duration: '120s',
  rps: 2000
}

export default function() {
  let res = http.get('http://localhost:8081/9310200/similar');
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  sleep(1);
}
