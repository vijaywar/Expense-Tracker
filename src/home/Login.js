import React, { Component } from 'react'
//import GoogleLogin from 'react-google-login'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import './login.css'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Home from './Home'
class Login extends Component {
    logout = () => {
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
                    <Route path='/home' component={Home} />
                    <Route exact path='/'>
                        <span className='cover'>
                            <h1 className='welcome'>Welcome!
                    <h2 className='welcome1'>Write your Story...</h2> </h1>

                        </span>
                        <div className='login99'>
                            <span className='login998'>Login with secured Google</span>
                            <button onClick={this.logout} className='login995'><span className='icongoogle'></span><span className='login996'>Login with Google</span> </button>

                        </div>
                    </Route>


                </Switch>

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