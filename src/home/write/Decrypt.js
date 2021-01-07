import React from 'react'
var CryptoJS = require("crypto-js")
export default function Decrypt(props) {
    if (props.value !== undefined) {
        return (
            <div>  {JSON.parse(CryptoJS.AES.decrypt(props.value, props.decpass).toString(CryptoJS.enc.Utf8)).slice(55, 150)}</div>
        )
    }
    else {
        return (<div>
            Hi
        </div>)
    }
}
