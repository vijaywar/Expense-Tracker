import React, { useState } from 'react'
import PiChart from '../Components/PiChart'
export default function Charts() {
    let recordPi = useState([{ name: 'expense', amount: 40 }, { name: 'income', amount: 60 }])
    return (
        <div className='mt-5 text-white'>
            <div className='card mt-2'>
                <div className="card-header text-dark">
                    <h3>Money</h3>
                </div>
                <div className="card-body">
                    <PiChart data={recordPi} />
                </div>
            </div>
        </div>
    )
}
