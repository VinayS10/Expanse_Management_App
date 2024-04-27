const moment = require("moment");
const transactionModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transaction = await transactionModel.find({
      ...(frequency === "all"
        ? {
            date: {
              $gt: moment().subtract(Number(10000000), "d").toDate(),
            },
          }
        : {
            ...(frequency !== "custom"
              ? {
                  date: {
                    $gt: moment().subtract(Number(frequency), "d").toDate(),
                  },
                }
              : {
                  date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1],
                  },
                }),
          }),
      // ...(frequency !=='custom' ? {
      //   date : {
      //     $gt : moment().subtract(Number(frequency), 'd').toDate(),
      //   },
      // } : {
      //   date : {
      //     $gte: selectedDate[0],
      //     $lte: selectedDate[1]
      //   }
      // }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const editTransaction = async(req, res) => {
  try {
    await transactionModel.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload)
    res.status(200).send("Edit transaction successfully")
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction added successfully");
  } catch (error) {
    console.error("Error adding transaction");
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction, editTransaction };
