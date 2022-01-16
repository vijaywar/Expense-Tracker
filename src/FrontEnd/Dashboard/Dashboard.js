import React from 'react'
import { Route } from 'react-router'
import NavBar from '../NavBar/NavBar'
export default function Dashboard() {
    return (
        <div>

            <NavBar />
            <div className='gymBoard'>
                <Route exact path='/Home'>
                    <div>
                        hi
                    </div>
                </Route>
                <Route path='/Home/Explore'>
                    <div>
                        it's ok
                    </div>
                </Route>
            </div>
        </div>
    )
}
