import React from 'react'
import WelcomeAnimation from './Welcome/WelcomeAnimation'
import { useState } from 'react'
import LandingPage from './LandingPage/LandingPage'
import NavBar from './NavBar/NavBar'
export default function Home() {
    const [Loaded, setLoaded] = useState(1)
    return (
        <div>
            <NavBar />
            {!Loaded ? <WelcomeAnimation /> : <LandingPage />}
        </div>
    )
}
