// NOTE: k6 is required to be installed on the machine to run locally
// can be tested if cd-ed in current dir
// and `k6 run simple-test.js`
const http = require("k6/http");

export const options = {
  vus: 1,
  duration: "60s",
};

export default () => {
  http.get("http://localhost:8002/api/v1/products");
};
