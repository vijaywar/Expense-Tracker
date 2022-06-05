import React, { Component } from 'react'
//import GoogleLogin from 'react-google-login'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import './login.css'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Home from '../../FrontEnd/Home'
import Dashboard from '../../FrontEnd/Dashboard/Dashboard'
class Login extends Component {
    login = () => {
        this.props.firebase.login({
            provider: 'google',
            type: 'popup',
            // scopes: ['email'] // not required
        })


    }
    render() {
        return (
            <div>

                <Switch>
                    <Route path='/homestart' userDetails={this.props.auth} component={Home} />
                    <Route path='/dashboard' >
                        {this.props.auth !== undefined && this.props.auth.providerData !== undefined ? <Dashboard userDetails={this.props.auth.providerData[0]} /> : null}
                    </Route>
                    <Route exact path='/'>
                        <span className='cover'>
                            <h1 className='welcome'>Welcome!
                                <div className='welcome1'>Trade Rich...</div> </h1>

                        </span>
                        <div className='login99'>
                            <span className='login998'>Login with secured Google</span>
                            <button onClick={this.login} className='login995'><span className='icongoogle'></span><span className='login996'>Login with Google</span> </button>

                        </div>
                    </Route>
                </Switch>
                {
                    this.props.auth.displayName === undefined ? (null) : (<Redirect to='/dashboard' />)
                }
            </div>
        )
    }
}
Login.propTypes = {
    firebase: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,

    }
}
const mapDispatchToProps = {
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect(),
)(Login)
/*
 {
                    this.props.auth.displayName === undefined ? (null) : (<Redirect to='/home' />)
                }
*/