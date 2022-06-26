import React from 'react'
import { Link } from 'react-router-dom';
import './Pichart.css'
export default function PiChart(props) {
    function HideCover() {
        document.getElementById("qc").style.display = 'none';
    }
    function piChart() {
        reset();
        var charPi = 180;
        console.log(props.data)
        if (Number.isNaN(props.data.data)) { document.getElementById('AddNewIcon').style.display = 'block'; charPi = 360 }
        else { document.getElementById('AddNewIcon').style.display = 'none' }
        if (props !== undefined && !Number.isNaN(props.data.data))
            charPi = props.data.data;
        if (charPi < 90)
            document.getElementById("qc").style.transform = 'rotate(' + charPi + 'deg)';
        else {
            document.getElementById("qc").style.transform = 'rotate(90deg)';
            setTimeout(HideCover, 450)
            if (charPi < 180) {
                document.getElementById("q2").style.transform = 'rotate(' + (charPi - 90) + 'deg)';
            }
            else if (charPi < 270) {
                console.log("All ok")
                document.getElementById("q2").style.transform = 'rotate(90deg)';
                document.getElementById("q3").style.transform = 'rotate(' + (charPi - 90) + 'deg)';
            }
            else {
                document.getElementById("q2").style.transform = 'rotate(90deg)';
                document.getElementById("q3").style.transform = 'rotate(180deg)';
                if (charPi > 360) charPi = 360
                document.getElementById("q4").style.transform = 'rotate(' + (charPi - 90) + 'deg)';
            }

        }

    }
    let reset = () => {
        document.getElementById("q2").style.transform = 'rotate(0deg)';
        document.getElementById("q3").style.transform = 'rotate(0deg)';
        document.getElementById("q4").style.transform = 'rotate(0deg)';
        document.getElementById("qc").style.transform = 'rotate(0deg)';
    }
    setTimeout(piChart, 400);

    return (
        <div>
            <div class="vcard">
                <div class="circleO">
                    <div id="q1" class="circlep"></div>
                    <div id="q2" class="circlep"></div>
                    <div id="q3" class="circlep"></div>
                    <div id="q4" class="circlep"></div>
                    <div class="circlei"></div>
                    <div id="qc" class="circlec"></div>
                </div>
                <Link to="/dashboard/Trade" id="AddNewIcon" className='piAddNew'><i class="fa fa-plus" aria-hidden="true"></i>Add </Link>
                <span className='incomePercent'>{Math.round(props.data.data * 100 / 360)}%</span>
                <span className="incomeV"> <span className='incomeBlock'></span> Income</span>
                <span className="expenseV"><span className='expenseBlock'></span> Expense</span>
            </div>
            <div className='  detailsCD'>
                {props.data.income === 0 && props.data.expense === 0 ?
                    <span> <i class="fa fa-money" aria-hidden="true"></i> No Data Available</span>
                    : <React.Fragment>
                        <span className='incomeVD'>Income: +{props.data.income}</span>
                        <span className='expenseVD'>Expense: -{props.data.expense}</span>
                    </React.Fragment>}

                <p className="savingVD">Savings: {props.data.income - props.data.expense < 0 ?
                    <span className="text-warning">-{props.data.income - props.data.expense}</span>
                    : <span className="text-green">+{props.data.income - props.data.expense}</span>
                }</p>
            </div>
        </div >
    )
}
