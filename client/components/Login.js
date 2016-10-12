import React from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { Link, browserHistory } from 'react-router'
import { Button, Input } from 'rebass'

import app from '../feathers'
class Login extends React.Component {

    state = {
        email : "",
        password : ""
    }

    update = (event) => {
        const element = event.target
        let input = {}
        input[element.name] = element.value
        this.setState(input)
    }

    login = () => {
        console.log(this.state);

        app.authenticate({
            type: "local",
            email : this.state.email,
            password : this.state.password
        })
        .then(user => {
            browserHistory.push('/ConfigureEvents')
        })
        .catch(err => {
            console.log(err);
            alert("Foutieve inlognaam en/of wachtwoord")
        })
    }

    render() {

        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h1>Inloggen</h1>
                    <Input label="Naam" name="email" onChange={this.update} />
                    <Input label="Wachtwoord" name="password" type="password" onChange={this.update} />

                    <Button onClick={this.login}>Inloggen</Button>
                </div>
            </div>
        )
    }
}

export default connect()(Login)
