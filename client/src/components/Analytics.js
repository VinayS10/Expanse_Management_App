import { Progress } from 'antd'
import React from 'react'

const Analytics = ({allTransaction}) => {

    //total transactions
    const totalTransaction = allTransaction.length
    const totalIncomeTransaction = allTransaction.filter((transaction) => transaction.type === 'income')
    const totalExpenseTransaction = allTransaction.filter((transaction) => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) *100
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction ) *100

    // total turnover
    const totalturnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount,0)
    const totalIncomeTurnover = allTransaction.filter((transaction) => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount,0)
    const totalExpenseTurnover = allTransaction.filter((transaction) => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount,0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalturnover) *100
    const totalExpenseTurnoverPercent =(totalExpenseTurnover/totalturnover) *100


  return (
    <>
        <div className='row m-3'>
            <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total Transaction : {totalTransaction}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-success'>Income : {totalIncomeTransaction.length}</h5>
                        <h5 className='text-danger'>Expense : {totalExpenseTransaction.length}</h5>
                        <div>
                            <Progress type='circle' strokeColor={'green'} percent={totalIncomePercent.toFixed(0)}/>
                            <Progress type='circle' strokeColor={'red'} percent={totalExpensePercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total Turnover : {totalturnover}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                        <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                        <div>
                            <Progress type='circle' strokeColor={'green'} percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                            <Progress type='circle' strokeColor={'red'} percent={totalExpenseTurnoverPercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Analytics