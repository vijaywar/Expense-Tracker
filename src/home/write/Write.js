import React, { Component } from 'react'
import './write.css'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
var CryptoJS = require("crypto-js")
class Write extends Component {
    state = {
        date: '', paycut: '', da: '', pass: 'vijay', story: '', holder: new Date()
    }
    onch = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    new = () => {
        console.log('new')
        this.setState({ story: new Date(), date: '' })
    }
    updstory = () => {
        const { firestore } = this.props;
        var story = this.state.holder.toString() + '\n' + this.state.story
        var encrytext = CryptoJS.AES.encrypt(JSON.stringify(story), this.props.keypass).toString();
        if (this.props.aka[0]) {
            var news;
            if (this.props.aka[0].diary) {
                news = {
                    'diary': [{
                        stroy: encrytext,
                        date: new Date().getTime()
                    }, ...this.props.aka[0].diary]
                }
            }
            else {
                news = {
                    'diary': [{
                        stroy: encrytext,
                        date: new Date().getTime()
                    }]
                }
            }
            firestore.update({ collection: 'flash', doc: this.props.auth.uid }, news).then(() =>
                alert('Updated')

            )
            this.setState({ story: '', holder: new Date(), date: '' })
        }

    }
    updel = () => {
        const { firestore } = this.props;
        const news = this.props.aka[0].diary.filter(i => i.date !== this.state.date);
        var newsupd = {
            'diary': [...news]
        }
        firestore.update({ collection: 'flash', doc: this.props.auth.uid }, newsupd).then(() => alert('Updated'))
    }
    updold = () => {
        var encrytext = CryptoJS.AES.encrypt(JSON.stringify(this.state.story), this.props.keypass).toString();
        const { firestore } = this.props;
        const news = this.props.aka[0].diary.filter(i => i.date !== this.state.date);

        var newsupd = {
            'diary': [{
                stroy: encrytext,
                date: this.state.date
            }, ...news]
        }
        firestore.update({ collection: 'flash', doc: this.props.auth.uid }, newsupd).then(() => alert('Updated'))
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.story) {
            if (nextProps.story !== prevState.paycut) {
                var encrytext = CryptoJS.AES.decrypt(nextProps.story, nextProps.keypass);
                var decrytext = JSON.parse(encrytext.toString(CryptoJS.enc.Utf8));

                return { story: decrytext, paycut: nextProps.story, date: nextProps.date }
            }
            return {}

        }

        else { return null }
    }
    render() {

        return (
            <div>
                <textarea name='holder' onChange={this.onch} value={this.state.holder} className='writektime' placeholder='Write your feelings...'></textarea>
                <textarea name='story' onChange={this.onch} value={this.state.story} className='writek' placeholder='Write your feelings...'></textarea>

                {this.state.date === '' ? <button className='savebtn' onClick={this.updstory}>Save</button> :
                    <span>

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