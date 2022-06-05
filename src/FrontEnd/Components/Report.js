
import { useFirestore } from 'react-redux-firebase';
import React, { useEffect, useState } from 'react';
import './Report.css'
export default function Report(props) {
    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: 1500,
        fundsAction: '',
        id: 0
    }])
    let getData = () => {
        console.log(props.records)
        setRecords(props.records.slice());
    }
    useEffect(() => { getData() }, [])

    return (
        <div>
            <div className='m-5 card bg-secondary transactionCards'>
                <h1 className='card-header'>Details</h1>
                <div className="card-body">
                    {records ? records.map(i => <div className='transactionCard'> {
                        i.fundsAction === "W" ?
                            <div className="card bg-dark" key={i.id}>
                                <p >Amount: <span className="text-warning">-{i.amount}</span></p>
                                <p className="text-warning">Withdraw</p>
                                <p>{new Date(i.recordTime).toLocaleString()}</p>
                            </div>
                            :
                            <div className="card bg-dark" key={i.id}>
                                <p >Amount: <span className="text-success">+{i.amount}</span></p>
                                <p className="text-success">Deposited</p>
                                <p>{new Date(i.recordTime).toLocaleString()}</p>
                            </div>
                    }
                    </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
