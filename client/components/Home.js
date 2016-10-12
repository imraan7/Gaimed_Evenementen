import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Label } from 'rebass'

class Home extends React.Component {

    render() {

        const {events} = this.props

        return (
            <div className="container">
            <div className="col-xs-12 col-md-6">
                <Link to="/login">  <i className="fa fa-sign-in">Login</i></Link>
            </div>
                <h3>Evenementen</h3>
                {events.map(event => {
                    return (
                        <div className="col-xs-6 col-sm-3" key={event._id}>
                            <i className="fa fa-shield fa-rotate-270"></i>
                            {" "+event.name} <Link to={"/event/" + event._id}><i className="fa fa-info-circle"></i></Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events : state.app.events,
    }
}

export default connect(mapStateToProps)(Home)
