import React, { useEffect, useState } from 'react'
import PiChart from '../Components/PiChart';

export default function Charts(props) {


    let [records, setRecords] = useState([{
        recordTime: '0',
        amount: '',
        fundsAction: '',
        id: 0,
        message: ''
    }])
    let [profit, setProfit] = useState(0)
    let [totalprofit, settotalprofit] = useState(0)
    let [filterChart, setFilterChart] = useState(3);
    let getData = (recordsOrder) => {
        profit = 0
        totalprofit = 0
        let income = 0
        let expense = 0
        // setRecords(props.records.slice());
        console.log(records);
        for (var i of recordsOrder) {
            console.log(i, "thi is i")
            if (i.fundsAction === "W") {
                totalprofit -= parseInt(i.amount);
                if (new Date(i.recordTime).getMonth() === new Date().getMonth()) {
                    profit -= parseInt(i.amount);
                }
                expense += parseInt(i.amount);
            }
            else {
                totalprofit += parseInt(i.amount);
                if (new Date(i.recordTime).getMonth() === new Date().getMonth()) {
                    profit += parseInt(i.amount);
                }
                income += parseInt(i.amount);
            }
        }
        setProfit(profit)
        settotalprofit(totalprofit);
        setIncomePercent({ data: income * 360 / (income + expense), expense: expense, income: income });

    }
    useEffect(() => { filterData() }, [props.records])

    let filterData = () => {

        let recordsOrder = props.records.slice();
        recordsOrder = recordsOrder.sort((a, b) => new Date(a.recordTime) - new Date(b.recordTime))
        var filterdata = document.getElementById('filterChart').value;
        setFilterChart(parseInt(filterdata));
        let deadlineTIme = new Date();
        console.log(filterdata);
        switch (filterdata) {
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
                // console.log("THis weeek filter", deadlineTIme, weekEndTime, recordsOrder)
                recordsOrder = recordsOrder.filter(i => new Date(i.recordTime) > deadlineTIme && new Date(i.recordTime) < weekEndTime)
                //console.log("this records after week", recordsOrder)
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
        console.log(recordsOrder);
        getData(recordsOrder);
    }

    let [recordPi, setIncomePercent] = useState({ data: 0, income: 0, expense: 0 })//useState([{ name: 'expense', amount: 40 }, { name: 'income', amount: 60 }])
    return (
        <div className='mt-1 text-white'>

            <div className='card  picharCard'>
                <div className="card-header text-white bg-vdark">
                    <span>This Month</span>
                    <select id='filterChart' value={filterChart} onChange={filterData} className="form-select filterChartButton" aria-label="Default select example">
                        <option value="0" >Today</option>
                        <option value="1">This Week</option>
                        <option value="2">Last Week</option>
                        <option value="3">This Month</option>
                        <option defaultValue value="4">All Time</option>
                        <option value="5">Custom</option>
                    </select>

                </div>
                <div className="card-body">
                    <PiChart data={recordPi} />
                </div>
            </div>
        </div>
    )
}
