import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
export default function NavBar() {
    return (
        <div className="navBar">
            <Link to='/Home' className="navBarItem">Home</Link>
            <Link to='/Home/Explore' className="navBarItem">Explore</Link>

        </div>
    )
}
