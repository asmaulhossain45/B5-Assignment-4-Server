import mongoose, { Model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import Book from "./book.model";

const borrowSchema: Schema<IBorrow> = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.post("save", async function (doc) {
  const book = await Book.findById(doc.book);

  if (book) {
    book.copies -= doc.quantity;
    await book.save();
  }
});

const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
