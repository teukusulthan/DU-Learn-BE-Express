import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/cors";
import authRoute from "./routes/auth";
import productsRoute from "./routes/product";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// COOKIE PARSER
app.use(cookieParser());

// JSON BODY PARSER
app.use(express.json());

// GLOBAL CORS
app.use(corsMiddleware);

// PUBLIC
app.use("/api/v1/auth", authRoute);

// PRODUCTS
app.use("/api/v1/products", productsRoute);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);

export default app;
