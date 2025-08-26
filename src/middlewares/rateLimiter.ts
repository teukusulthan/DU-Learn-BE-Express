import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "too many requests at this time, please try again in a moment",
});

export default limiter;
