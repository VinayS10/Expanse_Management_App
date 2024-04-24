const transactionModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.find({
      userid: req.body.userid,
    });
    res.status(200).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

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

module.exports = { getAllTransaction, addTransaction };