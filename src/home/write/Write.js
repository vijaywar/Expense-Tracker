import React, { Component } from 'react'
import './write.css'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
class Write extends Component {
    state = {
        story: new Date()
    }
    onch = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    updstory = () => {


        const { firestore } = this.props;
        if (this.props.aka[0]) {
            const news = {
                'diary': [{
                    doc: this.props.auth.uid,
                    id: this.props.auth.uid,
                    stroy: this.state.story,
                    email: this.props.auth.email,
                    date: new Date().getTime()
                }, ...this.props.aka[0].diary]
            }
            firestore.update({ collection: 'flash', doc: this.props.auth.uid }, news).then(() => alert('Updated'))
        }
        else {
            const news = {
                'diary': [{
                    doc: this.props.auth.uid,
                    id: this.props.auth.uid,
                    stroy: this.state.story,
                    email: this.props.auth.email,
                    date: new Date().getTime()
                }]
            }
            firestore.set({ collection: 'flash', doc: this.props.auth.uid }, news).then((docref) => {
                alert('success');
            });
        }



    }
    render() {
        return (
            <div>
                <textarea name='story' onChange={this.onch} value={this.state.story} className='writek' placeholder='Write your feelings...'></textarea>
                <button className='savebtn' onClick={this.updstory}>Save</button>
            </div>
        )
    }
}
Write.proptype = {
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
)(Write)