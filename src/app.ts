import express from "express";
import authRoute from "./routes/auth";
import productsRoute from "./routes/product";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

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
