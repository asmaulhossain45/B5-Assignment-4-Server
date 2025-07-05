import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const genre = (req.query.filter as string) || "";
    const sortBy = (req.query.sortBy as string) || "title";
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "asc";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const sortOptions: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const filter: Record<string, unknown> = {};
    if (genre) {
      filter.genre = genre.toUpperCase();
    }

    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find(filter).sort(sortOptions).skip(skip).limit(limit),
      Book.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta: {
        total,
        page,
        limit,
      },
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
  const updatedBook = req.body;
  try {
    const book = await Book.findByIdAndUpdate(bookId, updatedBook, {
      runValidators: true,
      new: true,
    });

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "The book does not exist",
      });
      return;
    }

    book.updateAvailability();
    await book.save();

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
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
