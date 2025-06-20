import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;
  try {
    const query = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "The book does not exist",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const body = req.body;
  try {
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  const { copies } = req.body;
  try {
    if (copies === undefined) {
      res.status(400).json({
        success: false,
        message: "Book copies is required",
        error: "Book copies is required",
      });
      return;
    }

    const book = await Book.findByIdAndUpdate(
      bookId,
      { copies },
      { runValidators: true, new: true }
    );

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "The book does not exist",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
