import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/v1/customers",
  proxy("http://localhost:8001", {
    proxyReqPathResolver: (req) => {
      return `/api/v1/customers${req.url}`;
    },
    preserveHostHdr: true,
  })
);

app.use(
  "/api/v1/shopping",
  proxy("http://localhost:8003", {
    proxyReqPathResolver: (req) => {
      return `/api/v1/shopping${req.url}`;
    },
    preserveHostHdr: true,
  })
);

app.use(
  "/api/v1", // products
  proxy("http://localhost:8002", {
    proxyReqPathResolver: (req) => {
      return `/api/v1${req.url}`;
    },
    preserveHostHdr: true,
  })
);

app.listen(8000, () => {
  console.log("Gateway is listening on port 8000");
});
