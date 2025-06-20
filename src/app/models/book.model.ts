import mongoose, { Model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema: Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Book author is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Book genre is required"],
      uppercase: true,
      enum: {
        values: [
          "FICTION",
          "NON-FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY or FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "Book ISBN is required"],
      unique: true,
      trim: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Book copies is required"],
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

const Book: Model<IBook> = mongoose.model<IBook>("Book", bookSchema);

export default Book;
