import React, { Component } from 'react'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Write from './write/Write'
import Bar from './write/Bar'
import Prev from './write/Prev'
class Home extends Component {
    state = {
        date: Date(), data: '', hr: '', min: '', sec: '', mil: ''
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
        setInterval(this.date, 1000)
    }
    render() {


        if (this.props.aka) {
            return (
                <div>
                    <div className='card' >
                        <div className='bar'>
                            <Bar auth={this.props.auth} />
                            <span className='time'>{this.state.hr}:{this.state.min}:{this.state.sec} . <span className='mill'>{this.state.mil}</span> </span>
                        </div>
                        <div className='write'>
                            <Write auth={this.props.auth} />
                        </div>
                        <div className='previous'>
                            <Prev data={this.props.aka[0].diary} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (<h1>Loading...</h1>)
        }
    }
}
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