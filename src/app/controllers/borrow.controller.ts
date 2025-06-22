import { NextFunction, Request, Response } from "express";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";

export const getBorrowedBookSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    if (data.length === 0) {
      res.status(404).json({
        success: false,
        message: "Borrowed books summary not found",
        error: "There are no borrowed books",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { book: bookId, quantity, dueDate } = req.body;

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

    if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: `There is only ${book.copies} copies available`,
        error: `Not enough copies available`,
      });
      return;
    }

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};
