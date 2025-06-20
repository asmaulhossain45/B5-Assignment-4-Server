import { Request, Response } from "express";

const getBorrowedBookSummary = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const borrowBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { getBorrowedBookSummary, borrowBook };
