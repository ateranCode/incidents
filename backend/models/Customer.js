import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    identity: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    details: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
