import React from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { Button, Input, Select, Label, Panel, PanelHeader} from 'rebass'

import {fetch_person, create_person} from '../actions/person'

class Register extends React.Component {
    state={ dateIndex : 0}

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

    updateDate= (e) => {
        const {dispatch} = this.props
        let {dateIndex} = this.state
        dateIndex = e.target.value
        dispatch(actions.change("person." + e.target.name, e))

        this.setState({
            dateIndex : dateIndex
        })
    }

    updateTime= (e) => {
        const {dispatch} = this.props
        dispatch(actions.change("person.time" + e.target.value, e))
    }
    savePerson= () => {
        const { dispatch, person } = this.props
        console.log(person);
        //dispatch(create_person(person, fetch_person))
    }

    renderDepartment= () => {
        if(this.props.person.type === "employee") {
            return (<Input label="Afdeling" name="department" onChange={this.update} />)
        }
    }
    renderDates= () => {
        const { event } = this.props
        return(
            <Select label="Datum" name="date"
                options={event.dates.map((date, i) => {
                    return(
                        {children: date.date, value: i}
                    )
                })} onChange={this.updateDate}
            />
        )
    }
    renderBeginTime= () => {
        const { event } = this.props
        let {dateIndex} = this.state
        if("undefined" !== typeof dateIndex && "undefined" !== typeof event.dates[dateIndex]){
            return(
                <Select label="Tijd" name="time"
                    options={event.dates[dateIndex].times.map((time, i) => {
                        return(
                            {children: time.beginTime + "-" + time.endTime, value: time }
                        )
                    })} onChange={this.updateTime}
                />
            )
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
                            {this.renderDates()}
                            {this.renderBeginTime()}
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
        event : state.app.event,
        person : state.app.person
    }
}

export default connect(mapStateToProps)(Register)
