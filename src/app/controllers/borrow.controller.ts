import { NextFunction, Request, Response } from "express";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";

const getBorrowedBookSummary = async (
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

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  const { book: bookId, quantity, dueDate } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "The book does not exist",
      });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: `You can not borrow ${quantity} books`,
        error: `There is only ${book.copies} copies available`,
      });
    }

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    book.copies -= quantity;
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

export { getBorrowedBookSummary, borrowBook };
