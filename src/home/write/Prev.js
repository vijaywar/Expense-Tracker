
import React from 'react'

export default function Prev(props) {

    if (props.data) {
        return (
            <div>okay</div>

        )
    }
    else {
        return (
            <div className='nodata'>Your Dialy Stories gets added here</div>
        )
    }
}
