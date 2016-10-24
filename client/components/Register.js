import React from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { Button, Input, Select, Label, Panel, PanelHeader} from 'rebass'

import {fetch_person, create_person} from '../actions/person'

class Register extends React.Component {

    componentWillUpdate(nextProps) {
        const {dispatch, person} = this.props

        if("undefined" !== typeof nextProps.event._id && "undefined" === typeof person.event) {
            dispatch(actions.change("person.event", nextProps.event._id))
        }
    }

    update = (e) => {
        const {dispatch} = this.props
        dispatch(actions.change("person." + e.target.name, e))
    }

    savePerson= () => {
        const { dispatch, person } = this.props
        console.log(person);

        dispatch(create_person(person, fetch_person))
    }

    renderDepartment= () => {
        if(this.props.person.type === "employee") {
            return (<Input label="Afdeling" name="department" onChange={this.update} />)
        }
    }

    render() {
        const {event} = this.props
        return (
            <Panel theme="info">
                <PanelHeader inverted theme="default">
                    Aanmelden
                </PanelHeader>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <Form model="person" onSubmit={this.savePerson}>
                            <Select label="Type" name="type"
                                options={[{children: 'Ambtenaar', value: "employee"}, {children: 'Inwoner', value: "citizen"}]}
                                onChange={this.update}/>
                            <Input label="Voornaam" name="firstname" onChange={this.update} />
                            <Input label="Achternaam" name="lastname" onChange={this.update} />
                            <Input label="Telefoonnummer" name="telephone" onChange={this.update} />
                            <Input label="Emailadres" name="email" onChange={this.update} />
                            {this.renderDepartment()}
                            <Button>Opslaan</Button>
                        </Form>
                    </div>
                </div>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        person : state.app.person
    }
}

export default connect(mapStateToProps)(Register)
