import { Router } from "express";
import {
  borrowBook,
  getBorrowedBookSummary,
} from "../controllers/borrow.controller";

const route = Router();

route.get("/", getBorrowedBookSummary);

route.post("/", borrowBook);

export default route;
