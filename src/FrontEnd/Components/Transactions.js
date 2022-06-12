import React, { useState, useEffect } from 'react'
import { useFirestore } from 'react-redux-firebase';
import './Transactions.css'
export default function Transactions(props) {

    const firebase = useFirestore()
    let submitRecord = (e) => {
        e.preventDefault();
        record.id = records.length + 1
        firebase.collection('Data').doc(props.userDetails.uid).collection("TradeData").add(record)
            .then(data => { alert("Record Added!"); props.refresh(); });
        setRecord({
            amount: '',
        })

    }
    let [record, setRecord] = useState({
        recordTime: '0',
        amount: '',
        fundsAction: 'W',
        id: 0,
        message: ''
    })
    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: '',
        fundsAction: '',
        id: 0,
        message: ''
    }])
    let [profit, setProfit] = useState(0)
    let [totalprofit, settotalprofit] = useState(0)
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        record[name] = value;
        console.log(record);
        setRecord(record);
    }
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
        <div> <div className='card bg-dark gridOuter m-1 mx-md-5'>
            <div className='p-2'><span className='gridD'>Month Balance :</span> {profit >= 0 ?
                <span className='gridD text-success'>+{profit}</span>
                : <span className='gridD text-warning'>{profit}</span>
            }</div>
            <div className='p-2'><span className='gridD'>Total Balance :</span>{totalprofit >= 0 ?
                <span className='gridD text-success'>+{totalprofit}</span>
                : <span className='gridD text-warning'>{totalprofit}</span>}</div>
        </div>
            <div className='card bg-dark m-1 m-md-5 text14'>
                <h3 className=' bg-dark ms-5 text-left pt-2'>Funds</h3>
                <div className='mx-5'>
                    <div className='gridOuter mx-md-5'>
                        <div class="form-check">
                            <label className="form-check-label ">
                                <input onClick={handleChange} type="radio" className="form-check-input p-md-2 m-md-3" name="fundsAction" id="" value="W" defaultChecked />
                                <span className='mt-md-3 inlineblock '>Expense</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <label className="form-check-label">
                                <input onClick={handleChange} type="radio" className="form-check-input p-md-2 m-md-3" name="fundsAction" id="" value="A" />
                                <span className='mt-md-3 inlineblock '>Income</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="datetime-local" onChange={handleChange}
                            className="form-control" name="recordTime" id="" aria-describedby="helpId" placeholder="" />
                        <small id="helpId" class="form-text text-muted">Transaction Time</small>
                    </div>
                    <div class="form-group">
                        <label for="">Amount</label>
                        <input type="number" onChange={handleChange}
                            className="form-control" name="amount" id="" aria-describedby="helpId" placeholder="" />
                    </div>
                    <div className='card-fotter'>
                        <button type="submit" onClick={submitRecord} className="btn btn-primary   my-2">Submit</button>
                    </div>
                </div>


            </div>
        </div>
    )
}
