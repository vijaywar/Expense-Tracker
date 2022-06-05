import React, { useState, useEffect } from 'react'
import { useFirestore } from 'react-redux-firebase';
import './Transactions.css'
export default function Transactions(props) {

    const firebase = useFirestore()
    let submitRecord = (e) => {
        e.preventDefault();
        record.id = records.length + 1
        firebase.collection('Data').doc(props.userDetails.uid).collection("TradeData").add(record)
            .then(alert("Inserted"));
    }
    let [record, setRecord] = useState({
        recordTime: '0',
        amount: '',
        fundsAction: '',
        id: 0
    })
    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: '',
        fundsAction: '',
        id: 0
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
        setRecords(props.records.slice());
        for (var i of props.records) {
            console.log(i, "thi is i")
            if (i.fundsAction === "W") {
                totalprofit -= i.amount;
                if (new Date(i.recordTime).getMonth() === new Date().getMonth()) {
                    profit -= i.amount;
                }
            }
            else {
                totalprofit += i.amount;
                if (new Date(i.recordTime).getMonth() === new Date().getMonth()) {
                    profit += i.amount;
                }
            }
        }
        setProfit(profit)
        settotalprofit(profit);
    }
    useEffect(() => { getData() }, [])



    return (
        <div> <div className='card bg-dark gridOuter mx-5'>
            <div className='p-2'><span className='gridD'>Monthly Profit :</span> <span className='gridD text-success'>+{profit}</span></div>
            <div className='p-2'><span className='gridD'>Total Profit :</span><span className='gridD text-success'>+{totalprofit}</span></div>
        </div>
            <div className='card bg-dark m-5 text14'>
                <h3 className=' bg-dark ms-5 text-left pt-2'>Funds</h3>
                <div className='mx-5'>
                    <div className='gridOuter mx-5'>
                        <div class="form-check">
                            <label className="form-check-label ">
                                <input onClick={handleChange} type="radio" className="form-check-input p-2 m-3" name="fundsAction" id="" value="A" defaultChecked />
                                <span className='mt-3 inlineblock '>Add</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <label className="form-check-label">
                                <input onClick={handleChange} type="radio" className="form-check-input p-2 m-3" name="fundsAction" id="" value="W" />
                                <span className='mt-3 inlineblock '>Withdraw</span>
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
