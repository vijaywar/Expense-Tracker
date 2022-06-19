
import { useFirestore } from 'react-redux-firebase';
import React, { useEffect, useState } from 'react';
import './Report.css'
export default function Report(props) {
    const firebase = useFirestore();
    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: 1500,
        fundsAction: '',
        id: 0,
        uid: ''
    }])
    let [deleteRecordState, setDeleteRecords] = useState({
        recordTime: '0',
        amount: 1500,
        fundsAction: '',
        id: 0,
        uid: ''
    })
    let getData = () => {
        let recordsOrder = props.records.slice();
        recordsOrder = recordsOrder.sort((a, b) => new Date(a.recordTime) - new Date(b.recordTime))

        console.log(recordsOrder, props.records)
        for (let i of recordsOrder) {

            console.log("sorted aray is:" + i.recordTime)
        }
        setRecords(recordsOrder);
    }
    let deleteRecordModel = (e, id) => {
        deleteRecordState = records.filter(i => i.uid === id)[0];
        console.log(records, id, deleteRecordState)
        setDeleteRecords(deleteRecordState);
        document.getElementById("DeletemodelOPen").click();
    }
    let deleteRecord = () => {
        console.log(deleteRecordState.uid);
        firebase.collection('Data').doc(props.userDetails.uid).collection("TradeData").doc(deleteRecordState.uid).delete().then(props.refresh());
    }


    useEffect(() => { getData() }, [props.records])
    let filter = () => {
        let recordsOrder = props.records.slice();
        recordsOrder = recordsOrder.sort((a, b) => new Date(a.recordTime) - new Date(b.recordTime))
        var fitlerdata = document.getElementById('filterValue').value;
        let deadlineTIme = new Date();
        switch (fitlerdata) {
            case "0":
                recordsOrder = recordsOrder.filter(i => new Date(i.recordTime).toLocaleDateString() === new Date().toLocaleDateString())
                break;
            case "1":
                let weekDay = new Date().getDay();
                if (weekDay === 0) weekDay = 7;
                deadlineTIme = new Date(new Date().setDate(new Date().getDate() - weekDay))
                deadlineTIme.setHours(0);
                deadlineTIme.setMinutes(0);
                deadlineTIme.setMilliseconds(0);
                let weekEndTime = new Date(new Date().setDate(new Date().getDate() - weekDay + 7));
                recordsOrder = recordsOrder.filter(i => new Date(i.recordTime) > deadlineTIme && new Date(i.recordTime) < weekEndTime)
                break;
            case "2":
                let weekDayl = new Date().getDay();
                if (weekDayl === 0) weekDayl = 7;
                deadlineTIme = new Date(new Date().setDate(new Date().getDate() - weekDayl))
                deadlineTIme.setHours(0);
                deadlineTIme.setMinutes(0);
                deadlineTIme.setMilliseconds(0);
                let lastTIme = new Date(new Date().setDate(new Date().setDate(deadlineTIme.getDate() - 7)));
                recordsOrder = recordsOrder.filter(i => new Date(i.recordTime) > lastTIme && new Date(i.recordTime) < deadlineTIme)
                break;
            case "3":
                deadlineTIme = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()))
                deadlineTIme.setHours(0);
                deadlineTIme.setMinutes(0);
                deadlineTIme.setMilliseconds(0);
                deadlineTIme.setDate(0);
                recordsOrder = recordsOrder.filter(i => new Date(i.recordTime) > deadlineTIme);
                break;
            case "4":
                break;
            default:
                break;
        }
        setRecords(recordsOrder);
    }
    return (
        <div>
            <div className='m-1 m-md-5  card bg-secondary transactionCards'>
                <div className='card-header transactionCardBody'>
                    <h1 className='detailsName'>Details</h1>
                    <select id='filterValue' onChange={filter} className="form-select filterButton" aria-label="Default select example">
                        <option value="0" >Today</option>
                        <option value="1">This Week</option>
                        <option value="2">Last Week</option>
                        <option value="3">This Month</option>
                        <option defaultValue value="4">All Time</option>
                        <option value="5">Custom</option>
                    </select>
                </div>
                <div className="card-body mb-5 pb-3 ">
                    {records ? records.map(i => <div className='transactionCard'> {
                        i.fundsAction === "W" ?
                            <div className="card bg-dark" key={i.id}>
                                <p className="amountDisplay">Amount: <span className="text-warning">-{i.amount}</span></p>
                                <p onClick={(event) => deleteRecordModel(event, i.uid)} className='deleteIcon'><i class="fa fa-trash" aria-hidden="true"></i></p>
                                <p className="text-warning">Expense</p>
                                <p >{new Date(i.recordTime).toLocaleString()}</p>
                            </div>
                            :
                            <div className="card bg-dark" key={i.id}>
                                <p className="amountDisplay">Amount: <span className="text-success">+{i.amount}</span></p>
                                <p onClick={(event) => deleteRecordModel(event, i.uid)} className='deleteIcon'><i class="fa fa-trash" aria-hidden="true"></i></p>
                                <p className="text-success">Income</p>
                                <p>{new Date(i.recordTime).toLocaleString()}</p>
                            </div>
                    }
                    </div>
                    ) : null}

                    <button type="button" class="btn btn-primary hide" data-bs-toggle="modal" id='DeletemodelOPen' data-bs-target="#DeleteconfirmPopup">
                        Launch demo modal
                    </button>

                    <div class="modal fade mt-5" id="DeleteconfirmPopup" >
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-dark" id="exampleModalLabel">Confirm Delete</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className="card bg-dark" >
                                        <p className="amountDisplay">Amount: {deleteRecordState.amount < 0 ? <span className="text-warning">{deleteRecordState.amount}</span>
                                            : <span className="text-success">+{deleteRecordState.amount}</span>}</p>
                                        {deleteRecordState.fundsAction === "W" ?
                                            <p className="text-warning">Expense</p>
                                            : <p className="text-success">Income</p>}
                                        <p >{new Date().toLocaleString()}</p>
                                    </div>
                                    <p className='text-black'>Are you sure to Delete this Record?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" onClick={deleteRecord} class="btn btn-primary" data-bs-dismiss="modal">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
