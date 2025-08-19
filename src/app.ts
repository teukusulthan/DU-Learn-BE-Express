import express from "express";
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
