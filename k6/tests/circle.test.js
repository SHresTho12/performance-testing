// import { GATEWAY } from "../../constants/servers";
import http from "k6/http";

import { check, sleep } from "k6";

export const options = {
  vus: 1, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: "1m", // This can be shorter or just a few iterations
};

export default () => {
  const payload = JSON.stringify({
    email: "ekayesorko@gmail.com",
    password: "12345678",
    long_lived: false,
  });
  const headers = { "Content-Type": "application/json" };
  const urlRes = http.post(
    "http://host.docker.internal:5977/api/log-in",
    payload,
    {
      headers,
    }
  );

  console.log(urlRes.body);
};
sleep(1);
