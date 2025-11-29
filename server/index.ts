import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleWorkforceData } from "./routes/workforce";
import { handleAttendanceData } from "./routes/attendance";
import { handlePerformanceData } from "./routes/performance";
import { handleTurnoverData } from "./routes/turnover";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/workforce", handleWorkforceData);
  app.get("/api/attendance", handleAttendanceData);
  app.get("/api/performance", handlePerformanceData);
  app.get("/api/turnover", handleTurnoverData);

  return app;
}
