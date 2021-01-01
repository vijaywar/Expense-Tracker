
import React from 'react'

export default function Prev(props) {
    if (props.data) {
        return (

            <div className='preframe'>
                {props.data.map(i =>
                    <div className='preview'>
                        <div className='previsual'>{i.stroy}</div>
                        <div className='pretime'>{new Date(i.date).toLocaleDateString("en-US")}</div>
                    </div>

                )}
            </div>
        )
    }
    else {
        return (
            <div className='nodata'>Your Dialy Stories gets added here</div>
        )
    }
}
