import express, { Request, Response } from "express";
import { Application } from "express";
import bookRoutes from "./app/routes/book.routes";
import borrowRoutes from "./app/routes/borrow.routes";
import { errorHandler } from "./app/middlewares/errorHandler";
import cors from "cors";
import config from "./config";

const app: Application = express();

const allowedOrigins = [
  config.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("📚 Library is Open");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    error: "Endpoint does not exist",
  });
});

app.use(errorHandler);

export default app;
