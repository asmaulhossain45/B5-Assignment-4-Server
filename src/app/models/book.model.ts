import mongoose, { Model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema: Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      uppercase: true,
      enum: [
        "FICTION",
        "NON-FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book: Model<IBook> = mongoose.model<IBook>("Book", bookSchema);

export default Book;
