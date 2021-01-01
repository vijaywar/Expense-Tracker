import React from 'react'

export default function Bar(props) {

    return (
        <div className='bartab'>
            <span className='dp' ><img src={props.auth.photoURL} width='100%' height='100%' alt="DP" /></span>
            <span className='barbasic'>
                <span className='baremail'>{props.auth.displayName}</span>
                <span className='barname'>{props.auth.email}</span></span>
        </div>
    )
}
