import http from "k6/http";
import { STANDARD_SCENARIOS } from "../data/scenarios";
import { parseScenarios } from "../utils/scenario.js";
import { check, sleep } from "k6";

export const options = {
  scenarios: parseScenarios(__ENV, STANDARD_SCENARIOS),
};

export default () => {
  const urlRes = http.get("https://test-api.k6.io");
  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};
sleep(1);
