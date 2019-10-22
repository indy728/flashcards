import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions'

class Logout extends Component {
    componentDidMount() {
        console.log('[logout.js]')
        this.props.onLogout()
    }

    render() {
        return (
            // <Redirect to='/'/>
            <React.Fragment></React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
