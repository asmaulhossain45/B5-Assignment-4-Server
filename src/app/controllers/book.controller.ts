import { Request, Response } from "express";
import Book from "../models/book.model";

const getAllBooks = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
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

const getBookById = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
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

const createBook = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
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

const deleteBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
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

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
