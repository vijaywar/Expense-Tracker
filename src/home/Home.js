import React, { Component } from 'react'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Write from './write/Write'
import Bar from './write/Bar'
import Prev from './write/Prev'
import './home.css'
import Decrypt from './write/Decrypt'
import img from '../images/coolplus.png'
var CryptoJS = require("crypto-js")
class Home extends Component {
    state = {
        date: Date(), data: '', hr: '', min: '', sec: '',
        mil: '', story: '', idata: '', password: '', cpassword: '',
        done: false, decpass: ''
    }
    date = () => {
        var hr, min, sec, mil;
        var time = new Date();
        hr = time.getHours();
        min = time.getMinutes();
        sec = time.getSeconds();
        mil = time.getMilliseconds();
        this.setState({ hr, min, sec, mil });
    }
    componentDidMount = () => {
        setInterval(this.date, 200)
    }
    logout = () => {
        this.props.firebase.logout()
        this.props.history.push('/');
    }
    show = (i, e) => {
        this.setState({ story: i.stroy, idata: i.date })
    }
    new = () => {
        this.setState({ story: "", idata: "" })
    }
    setpassword = () => {
        if (this.state.password.length < 5) {
            alert("Password lenght can't be less than 5 characters!")
        }
        else if (this.state.password !== this.state.cpassword) {
            alert("Password not matched!")
        }
        else {
            var encrytext = CryptoJS.AES.encrypt(JSON.stringify(this.state.password), "IamFunnythis iscrazy").toString();
            const news = {
                'password': encrytext
            }

            this.props.firestore.set({ collection: 'flash', doc: this.props.auth.uid }, news).then((docref) => {
                alert('success');
            });
            this.setState({ done: true })
        }
    }
    passwordcheck = () => {
        var encrytext = CryptoJS.AES.decrypt(this.props.aka[0].password, "IamFunnythis iscrazy");
        var decrytext = JSON.parse(encrytext.toString(CryptoJS.enc.Utf8));
        if (decrytext === this.state.password) {
            this.setState({ done: true, decpass: decrytext })
        }
        else {
            alert("Incorrect Password!")
        }
    }
    onchange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            this.passwordcheck();
        }
    };
    render() {


        if (this.props.aka) {
            if (this.props.aka[0]) {
                if (this.props.aka[0].diary) {
                    var dataset = [...this.props.aka[0].diary];
                    dataset.sort((a, b) => {
                        return b.date - a.date;
                    });
                }
                else { dataset = [] }
            }
            return (
                <div>

                    {this.state.done ?
                        <div className='card' >
                            <div className='bar'>
                                <Bar auth={this.props.auth} />
                                <span className='time'>{this.state.hr}:{this.state.min}:{this.state.sec} . <span className='mill'>{this.state.mil}</span> </span>
                            </div>
                            <div className='write'>
                                {this.state.story !== '' ?
                                    <span>
                                        <Write auth={this.props.auth} keypass={this.state.decpass} story={this.state.story} date={this.state.idata} />
                                        <button className='addbtn' onClick={this.new}>Open New</button></span> :
                                    <Write auth={this.props.auth} keypass={this.state.decpass} />}

                            </div>
                            <div className='previous'>
                                {this.props.aka[0] ?
                                    <div className='preframe'>
                                        {dataset.map(i =>
                                            <div key={i.date} onClick={this.show.bind(this, i)} className='preview'>

                                                <div className='previsual'><Decrypt value={i.stroy} decpass={this.state.decpass} /></div>
                                                <div className='pretime'>{new Date(i.date).toLocaleDateString("en-US")}</div>
                                            </div>

                                        )}
                                    </div>
                                    : <Prev />}
                            </div>
                            <div className='logout'><button className='logoutbtn' onClick={this.logout}>Logout</button></div>
                        </div> :
                        <div className='deck'>
                            <span className='userdp'><img src={this.props.auth.photoURL} width='100%' height='100%' alt="DP" /></span>
                            <span className='dpname'>{this.props.auth.displayName}</span>

                            {this.props.aka[0] ? <span className='inputdp'>
                                <input name='password' onKeyPress={this.handleKeypress.bind(this)} onChange={this.onchange} value={this.state.password} placeholder='Password..' className='inputpas' type="password" />
                                <span className='mobilehelp' onClick={this.passwordcheck}><img className='arrowdp' src="https://firebasestorage.googleapis.com/v0/b/dear-diary-hi.appspot.com/o/lar.png?alt=media&token=0715872f-8550-4092-8a7e-330a5c7e923d" alt="S" /></span>
                            </span> :
                                <span>
                                    <span className='inputdp'><input name='password' value={this.state.password} onChange={this.onchange} placeholder='New Password..' className='inputpas' type="password" /></span>
                                    <span className='inputdp'><input name='cpassword' value={this.state.cpassword} onChange={this.onchange} placeholder='Confirem Password..' className='inputpas' type="password" /></span>
                                    <button onClick={this.setpassword} className='btndp'>Submit</button></span>}
                        </div>
                    }
                    <img src={img} alt="TIme" className='logohome' />
                </div>
            )
        }
        else {
            return (
                <div><h1>Loading...
                </h1>
                    <img className='imglogo' src={img} alt="Time" /></div>)
        }
    }
}
/*{JSON.parse(CryptoJS.AES.decrypt(i.stroy, this.state.decpass).toString(CryptoJS.enc.Utf8)).slice(55, 150)} */
Home.proptype = {
    firestore: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        aka: state.firestore.ordered.flash,
        auth: state.firebase.auth,

    }
}
const mapDispatchToProps = {
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [{ collection: 'flash', doc: props.auth.uid }]), firebaseConnect()
)(Home)