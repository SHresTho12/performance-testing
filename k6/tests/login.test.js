import { options } from "k6";
import http from "k6/http";

// Read the JSON file with login credentials
const file = open("../resources/loginCredentials.json");
const credentials = JSON.parse(file);

// export const options = {
//   vus: credentials.length, // Set the number of VUs to match the number of credentials
//   iterations: 1, // Set the number of iterations per VU (1 for sequential execution)
// };

// export const options = {
//   scenarios: parseScenarios(__ENV, STANDARD_SCENARIOS),
// };

export default function () {
  // Get the credentials for the current VU
  const { email, password, long_lived } = credentials[__VU - 1];

  const payload = JSON.stringify({
    email: email,
    password: password,
    long_lived: long_lived,
  });

  const headers = { "Content-Type": "application/json" };
  const urlRes = http.post(
    "http://host.docker.internal:5977/api/log-in",
    payload,
    {
      headers,
    }
  );

  console.log(`VU${__VU}: ${urlRes.body}`);
}
