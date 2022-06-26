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
    let refer = () => {
        console.log("Calling this")
        props.refresh();
        console.log(props.refresh);
    }
    return (

        < div >
            <div className='gridOuter ProfileDetails' >
               <div className='gridD'><p className='bg-secondary p-2 m-2  inlineblock VuserName'><i class="fa fa-user" aria-hidden="true"></i> {props.userDetails.displayName}</p> </div>
                <div className='gridD' > <button className='btn-secondary m-2 text14 p-1 float-right Vlogout' onClick={logout} >Logout <i class="fa fa-sign-out" aria-hidden="true"></i></button> </div>
            </div>
            <div className="navBar">
            <Link to='/dashboard/Trade' className="navBarItem"><i class="fa fa-plus" aria-hidden="true"></i> Add</Link>
                <Link to='/dashboard/' className="navBarItem"><i class="fa fa-home" aria-hidden="true"></i> </Link>
                <Link to='/dashboard/Report' className="navBarItem"><i class="fa fa-list" aria-hidden="true"></i> Report</Link>
            </div>

        </div >

    )
}
// 
// <div className='me-3' onClick={refer}>Refresh<i class="fa fa-refresh" aria-hidden="true"></i></div>
