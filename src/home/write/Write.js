import React, { Component } from 'react'
import './write.css'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
class Write extends Component {
    state = {
        date: '', paycut: '', da: '', story: new Date()
    }
    onch = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    new = () => {
        this.setState({ story: new Date(), date: '' })
    }
    updstory = () => {
        const { firestore } = this.props;
        if (this.props.aka[0]) {
            const news = {
                'diary': [{

                    stroy: this.state.story,
                    date: new Date().getTime()
                }, ...this.props.aka[0].diary]
            }
            firestore.update({ collection: 'flash', doc: this.props.auth.uid }, news).then(() => alert('Updated'))
        }
        else {
            const news = {
                'diary': [{
                    stroy: this.state.story,
                    date: new Date().getTime()
                }]
            }
            firestore.set({ collection: 'flash', doc: this.props.auth.uid }, news).then((docref) => {
                alert('success');
            });
        }
    }
    updel = () => {
        const { firestore } = this.props;
        const news = this.props.aka[0].diary.filter(i => i.date !== this.state.date);
        firestore.update({ collection: 'flash', doc: this.props.auth.uid }, news).then(() => alert('Updated'))
    }
    updold = () => {
        const { firestore } = this.props;
        const news = this.props.aka[0].diary.filter(i => i.date !== this.state.date);
        var newsupd = {
            'diary': [{
                stroy: this.state.story,
                date: this.state.date
            }, ...news]
        }
        firestore.update({ collection: 'flash', doc: this.props.auth.uid }, newsupd).then(() => alert('Updated'))
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.story) {
            if (nextProps.story != prevState.paycut) {

                return { story: nextProps.story, paycut: nextProps.story, date: nextProps.date }
            }
        }

        else { return null }
    }
    render() {

        return (
            <div>
                <textarea name='story' onChange={this.onch} value={this.state.story} className='writek' placeholder='Write your feelings...'></textarea>
                {this.state.date == '' ? <button className='savebtn' onClick={this.updstory}>Save</button> :
                    <span>  <button className='addbtn' onClick={this.new}>Open New</button>

                        <button className='savebtn' onClick={this.updold}>Update</button>
                        <button className='savebtn' onClick={this.updel}>Delete</button></span>}

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