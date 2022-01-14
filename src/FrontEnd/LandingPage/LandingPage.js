import React, { useEffect, useState } from 'react'

export default function LandingPage() {
    const [Time, setTime] = useState(0);
    useEffect(() => {
        setInterval(() => setTime(new Date().toTimeString()))
    })
    return (
        <div>
            <div className="NewTests card border-white p-2 ">
                <div className="card">
                    <div className="card text-black">
                        <div class="bgGym " >
                            <div className="centerToDisplay">
                                <div className="text-center  text-white mt-5 h1 ">
                                    YOU CAN DO IT!

                                </div>
                                <div class="text-white text-center mt-5 h1">
                                    {Time.toString().slice(0, 8)}
                                </div>
                                <div className="text-center mt-2 pt-5">
                                    <button class="btn btn-primary  btn-lg">Start Now</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
