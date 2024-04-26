import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import Layout from "../components/layout/Layout";
// import { Link } from "react-router-dom";
import axios from "axios";
import Spinners from "../components/layout/Spinners";
import moment from "moment";
const {RangePicker} = DatePicker

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("all");
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
    },
  ];

  

  //useEffect hook
  useEffect(() => {
    //getall transactions
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/get-tranction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch issue with transactions");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  //form handler
  const submitHandler = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/transactions/add-tranction", {
        ...value,
        userid: user._id,
      });
      setLoading(false);
      message.success("Successfully added transaction");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };
  return (
    <Layout>
      {loading && <Spinners />}
      <div className="filters">
        <div>
          <h5>Select Frequency</h5>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="367">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value = {selectedDate} onChange={(values) => setSelectedDate(values)}/>}
        </div>
        <div>
          <h5>Select type</h5>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTransaction}></Table>
      </div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
