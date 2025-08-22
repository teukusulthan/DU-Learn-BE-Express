import express from "express";
import router from "./routes/";

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
