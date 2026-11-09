import express from "express";
import helmet from "helmet";

import errorHandler from "./middleware/error-handler.js";
import { authenticate } from "./middleware/authenticate.js";

import authRouter from "./routes/auth.js"

import watchlistRoutes from "./routes/watchlist.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", authenticate, (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/watchlist", authenticate, watchlistRoutes);

app.use("/api/auth", authRouter)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
