// import { GATEWAY } from "../../constants/servers";
import http from "k6/http";

import { check, sleep } from "k6";

import { STANDARD_SCENARIOS } from "../data/scenarios.js";
import { parseScenarios } from "../utils/scenario.js";

export const options = {
  scenarios: parseScenarios(__ENV, STANDARD_SCENARIOS),
};
export default () => {
  const payload = JSON.stringify({
    email: "ekayesorko@gmail.com",
    password: "Abcd1234",
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
