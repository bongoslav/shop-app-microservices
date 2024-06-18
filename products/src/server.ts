import http from "http";
import app from "./app";
import db from "./database/db";

let server: http.Server;

const startServer = async (port: number): Promise<{ server: http.Server }> => {
  await db.authenticate();
  console.log("Database connection has been established successfully.");

  await db.sync();
  console.log("Database synchronized.");

  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve({ server });
    });

    server.on("error", (err: any) => {
      reject(err);
    });
  });
};

const shutdown = async () => {
  console.log("Gracefully shutting down...");
  if (server) {
    server.close(() => {
      console.log("Closed out remaining connections.");
      db.close().then(() => {
        console.log("Database connection closed.");
        process.exit(0);
      });
    });
  }
};

["SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2"].forEach((sig) =>
  process.on(sig, async () => {
    console.log(`Received ${sig}. Gracefully shutting down...`);
    await shutdown();
  })
);

startServer(Number(process.env.LISTEN_PORT) || 8002)
  .then(() => {
    console.log("Products server started successfully");
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
