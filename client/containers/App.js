import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Footer } from 'rebass'

import {fetch_events} from '../actions/events'

class App extends React.Component {

    componentWillMount() {
        const {dispatch} = this.props

        dispatch(fetch_events())
    }

    render() {

        const year = new Date().getFullYear()

        return (
            <div>
                <div className="container-fluid">
                    {this.props.children}

                    <Footer>
                        Gaimed &copy; {year}. Alle rechten voorbehouden.
                    </Footer>
                </div>
            </div>
        )
    }
}

export default connect()(App)
