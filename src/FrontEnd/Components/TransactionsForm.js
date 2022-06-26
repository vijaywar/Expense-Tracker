import React from 'react'
import { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';

export default function TransactionsForm(props) {

    const firebase = useFirestore();

    let submitRecord = (e) => {

        if (record.amount === '') {
            toast("Enter Amount");

            return;
        }

        e.preventDefault();
        record.id = props.records.length + 1
        firebase.collection('Data').doc(props.userDetails.uid).collection("TradeData").add(record)
            .then(data => { alert("Record Added!"); props.refresh(); });
        let newRecord = {
            amount: '',
            fundsAction: record.fundsAction,
            recordTime: record.recordTime,
            id: 0,
            message: ''
        }
        setRecord(newRecord)

    }
    let toast = (message) => { alert(message) }
    let [record, setRecord] = useState({
        recordTime: new Date().toISOString().slice(0, 16),
        amount: '',
        fundsAction: 'W',
        id: 0,
        message: ''
    })
    let handleChange = (e) => {

        let recordEdited = { ...record }
        let name = e.target.name;
        let value = e.target.value;
        recordEdited[name] = value;
        console.log(record);
        setRecord(recordEdited);
    }
    return (
        <div>
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
                        <input type="datetime-local" onChange={handleChange} value={record.recordTime}
                            className="form-control" name="recordTime" aria-describedby="helpId" placeholder="" />
                        <small id="helpId" class="form-text text-muted">Transaction Time</small>
                    </div>
                    <div class="form-group">
                        <label for="">Amount</label>
                        <input type="number" onChange={handleChange} value={record.amount}
                            className="form-control" name="amount" aria-describedby="helpId" placeholder="" />
                    </div>
                    <div class="form-group">
                        <label for="">Message <span className='vfadeText text-white'>(optional)</span></label>
                        <input type="text" onChange={handleChange} value={record.message}
                            className="form-control" name="message" aria-describedby="helpId" placeholder="" />
                    </div>
                    <div className='card-fotter'>
                        <button type="submit" onClick={submitRecord} className="btn btn-primary   my-2">Submit</button>
                    </div>
                </div>


            </div>
        </div>
    )
}
