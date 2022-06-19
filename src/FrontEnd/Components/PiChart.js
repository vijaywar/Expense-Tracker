import React from 'react'
import './Pichart.css'
export default function PiChart(props) {
    function HideCover() {
        document.getElementById("qc").style.display = 'none';
    }
    function piChart() {
        var charPi = props.data.income;
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
    setTimeout(piChart, 200);

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
                <span className="incomeV"> <span className='incomeBlock'></span> Income</span>
                <span className="expenseV"><span className='expenseBlock'></span> Expense</span>
            </div>

        </div>
    )
}
