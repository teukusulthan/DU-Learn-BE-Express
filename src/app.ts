import express from "express";
import usersRouter from "../src/routes/users";
import postsRouter from "../src/routes/posts";

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

app.use("/api/v1", usersRouter);
app.use("/api/v1", postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
