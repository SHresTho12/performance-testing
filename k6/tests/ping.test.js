import http from "k6/http";
import { check, sleep } from "k6";
import { STANDARD_SCENARIOS } from "../data/scenarios.js";
import { parseScenarios } from "../utils/scenario.js";
// Constants for your login endpoint and ping location endpoint
const LOGIN_URL = "http://host.docker.internal:5977/api/log-in"; // Replace with your actual login endpoint
const PING_URL = "http://host.docker.internal:5977/api/ping"; // Replace with your actual ping location endpoint

export const options = {
  scenarios: parseScenarios(__ENV, STANDARD_SCENARIOS),
};

export function setup() {
  // Log in and obtain the access token
  const payload = JSON.stringify({
    email: "ekayesorko@gmail.com",
    password: "12345678",
    long_lived: false,
  });
  const loginHeaders = { "Content-Type": "application/json" };
  const loginResponse = http.post(LOGIN_URL, payload, {
    headers: loginHeaders,
  });

  check(loginResponse, {
    "Login successful": (resp) => resp.status === 200,
  });

  // Store the access token in the VU's environment
  return {
    accessToken: loginResponse.json("access_token"),
  };
}

export default function (data) {
  // Extract the access token from the environment
  const { accessToken } = data;

  // Set the Authorization header with the access token for subsequent requests
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const pingPayload = JSON.stringify({
    latitude: 24.3634094,
    longitude: 88.608234,
  });
  // Perform pings using the access token for the rest of the test duration

  const pingResponse = http.post(PING_URL, pingPayload, { headers });

  check(pingResponse, {
    "Ping successful": (resp) => resp.status === 200,
  });

  sleep(1); // Sleep for 1 second between pings (adjust as needed)
}

// export function teardown(data) {
//   // Perform any cleanup actions, if needed
// }
