import React, { useState, useEffect } from 'react'
import { useInsertionEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import './Transactions.css'
import TransactionsForm from './TransactionsForm';
export default function Transactions(props) {


    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: '',
        fundsAction: '',
        id: 0,
        message: ''
    }])
    let [profit, setProfit] = useState(0)
    let [totalprofit, settotalprofit] = useState(0)

    let getData = () => {
        profit = 0
        totalprofit = 0
        setRecords(props.records.slice());
        for (var i of props.records) {
            console.log(i, "thi is i")
            if (i.fundsAction === "W") {
                totalprofit -= parseInt(i.amount);
                if (new Date(i.recordTime).getMonth() === new Date().getMonth()) {
                    profit -= parseInt(i.amount);
                }
            }
            else {
                totalprofit += parseInt(i.amount);
                if (new Date(i.recordTime).getMonth() === new Date().getMonth()) {
                    profit += parseInt(i.amount);
                }
            }
        }
        setProfit(profit)
        settotalprofit(totalprofit);
    }
    useEffect(() => { getData() }, [props.records])


    return (
        <div> <div className='card bg-dark gridOuter m-1 mx-md-5 marginTopMobile'>
            <div className='p-2'><span className='gridD'>Month Balance :</span> {profit >= 0 ?
                <span className='gridD text-success'>+{profit}</span>
                : <span className='gridD text-warning'>{profit}</span>
            }</div>
            <div className='p-2'><span className='gridD'>Total Balance :</span>{totalprofit >= 0 ?
                <span className='gridD text-success'>+{totalprofit}</span>
                : <span className='gridD text-warning'>{totalprofit}</span>}</div>
        </div>
            <TransactionsForm records={records} userDetails={props.userDetails} refresh={props.refresh} />
        </div>
    )
}
