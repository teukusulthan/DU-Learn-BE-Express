import express from "express";
import usersRouter from "../src/routes/users";

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

app.use("/api/v1", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
