import mongoose, { Model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema: Schema<IBorrow> = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Borrow: Model<IBorrow> = mongoose.model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
