
import { Route } from 'react-router'
import NavBar from '../NavBar/NavBar'
import AddNew from '../AddNew/AddNew'
import './Dashboard.css';
import { useFirestore } from 'react-redux-firebase';
import Transactions from '../Components/Transactions';
import Report from '../Components/Report';
import { useState, useEffect } from 'react';
import Charts from './Charts';
export default function Dashboard(props) {
    const firebase = useFirestore()
    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: '',
        fundsAction: '',
        id: 0,
        uid: ''
    }])

    let loadData = () => {
        console.log("Called outside")
        if (records.length === 1) {
            console.log("Called inside")
            firebase.collection("Data").doc(props.userDetails.uid).collection("TradeData").get()
                .then(i => {
                    records.pop();
                    i.docs.forEach(doc => {
                        let reco = doc.data();
                        reco.uid = doc.id;
                        records.push(reco);
                        // console.log(reco);

                    });
                    setRecords(records.slice());
                    console.log(records); console.log("get data above")
                })

        }
    }
    let refreshDat = () => {
        records = []
        firebase.collection("Data").doc(props.userDetails.uid).collection("TradeData").get()
            .then(i => {
                records.pop();
                i.docs.forEach(doc => {
                    let reco = doc.data();
                    reco.uid = doc.id;
                    records.push(reco);

                });
                setRecords(records.slice());
                // console.log(records); console.log("get data above")
            })
    }
    useEffect(() => { loadData() }, [])
    return (
        <div>

            <NavBar userDetails={props.userDetails} />
            <div className='gymBoard'>
                <Route exact path='/dashboard/'>
                    <Charts records={records} />
                </Route>
                <Route exact path='/dashboard/Trade'>
                    <Transactions userDetails={props.userDetails} records={records} refresh={refreshDat} />
                </Route>
                <Route exact path='/dashboard/Report'>
                    <Report records={records} userDetails={props.userDetails} refresh={refreshDat} />
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
