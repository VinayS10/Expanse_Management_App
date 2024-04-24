const { timeStamp } = require("console");
const mongoose = require("mongoose");

const transctionSchema = new mongoose.Schema(
  {
    userid: {
      type:String,
      required:true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      required : [true, "type is required"],
    },
    category: {
      type: String,
      requires: [true, "category is required"],
    },
    refrence: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
  },
  { timeStamp: true }
);

const transactionModel = new mongoose.model('transactions', transctionSchema);
module.exports = transactionModel;
