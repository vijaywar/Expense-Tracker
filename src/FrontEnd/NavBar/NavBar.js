import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import { useFirebase } from 'react-redux-firebase'
export default function NavBar(props) {
    if (props.userDetails != undefined) {
        console.log(props.userDetails)
    }

    const firebase = useFirebase();
    let logout = () => {
        firebase.logout();
    }
    return (

        < div >
            <div className='gridOuter ProfileDetails' >
                <div className='gridD'><p className='bg-secondary p-2 m-2  inlineblock'>{props.userDetails.displayName}</p> </div>
                <div className='gridD' > <button className='btn-secondary m-2 text14 p-2 float-right' onClick={logout} >Lotout</button> </div>
            </div>
            <div className="navBar">
                <Link to='/dashboard/Trade' className="navBarItem">Home</Link>
                <Link to='/dashboard/Report' className="navBarItem">Report</Link>
            </div>

        </div >

    )
}
