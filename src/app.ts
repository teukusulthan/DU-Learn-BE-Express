import express from "express";
import authRoute from "./routes/auth";
import indexRoute from "./routes/index";
import { authenticate } from "./middlewares/auth";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

// Public
app.use("/api/v1/auth", authRoute);

// Protected
app.use("/api/v1", authenticate, indexRoute);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
export default app;
