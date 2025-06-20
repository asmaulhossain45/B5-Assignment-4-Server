import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller";
const route = Router();

route.get("/", getAllBooks);

route.get("/:bookId", getBookById);

route.post("/", createBook);

route.put("/:bookId", updateBook);

route.delete("/:bookId", deleteBook);

export default route;
