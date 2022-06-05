
import { Route } from 'react-router'
import NavBar from '../NavBar/NavBar'
import AddNew from '../AddNew/AddNew'
import './Dashboard.css';
import { useFirestore } from 'react-redux-firebase';
import Transactions from '../Components/Transactions';
import Report from '../Components/Report';
import { useState, useEffect } from 'react';
export default function Dashboard(props) {
    const firebase = useFirestore()
    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: '',
        fundsAction: '',
        id: 0
    }])
    let loadData = () => {
        if (records.length === 1) {
            console.log("Called inside")
            firebase.collection("Data").doc(props.userDetails.uid).collection("TradeData").get()
                .then(i => {
                    records.pop();
                    i.docs.forEach(doc => {
                        records.push(doc.data());

                    });
                    setRecords(records.slice());
                    console.log(records); console.log("get data above")
                })

        }
    }
    useEffect(() => { loadData() }, [])
    return (
        <div>

            <NavBar userDetails={props.userDetails} />
            <div className='gymBoard'>
                <Route exact path='/dashboard/Trade'>
                    <Transactions userDetails={props.userDetails} records={records} />
                </Route>
                <Route exact path='/dashboard/Report'>
                    <Report records={records} />
                </Route>
                <Route path='/dashboard/Explore'>
                    <div>
                        <AddNew />
                    </div>
                </Route>
            </div>
        </div>
    )
}
