import cors from "cors";
import { Application } from "express";
import bookRoutes from "./app/routes/book.routes";
import express, { Request, Response } from "express";
import borrowRoutes from "./app/routes/borrow.routes";
import { errorHandler } from "./app/middlewares/errorHandler";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://b5assignment4client.vercel.app",
    ],
  })
);

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
