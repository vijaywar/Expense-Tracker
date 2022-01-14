import React from 'react'
import WelcomeAnimation from './Welcome/WelcomeAnimation'
import { useState } from 'react'
import LandingPage from './LandingPage/LandingPage'
export default function Home() {
    const [Loaded, setLoaded] = useState(1)
    return (
        <div>
            {!Loaded ? <WelcomeAnimation /> : <LandingPage />}
        </div>
    )
}
