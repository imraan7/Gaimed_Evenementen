import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Select, Label, Panel, PanelHeader, Overlay} from 'rebass'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import $ from 'jquery'

import {fetch_events, create_event} from '../actions/events'

class ConfigureEvents extends React.Component {

    state={ event : { dates :[] }, popupOpen : false, dateIndex : null}

    update = (e) => {
        let {event} = this.state
        event[e.target.name] = e.target.value

        this.setState({
            event : event
        })
    }

    updateDate = (dateInput) => {
        let {event, dateIndex} = this.state

        event.dates[dateIndex].date = dateInput
        this.setState({
            event : event,
            dateIndex : dateIndex
        })
        console.log(event);
    }

    updateTime = (e) => {
        let {event, dateIndex} = this.state
        let index = e.target.dataset.index
        event.dates[dateIndex].times[e.target.dataset.index][e.target.name] = e.target.value

        this.setState({
            event : event
        })
    }

    saveEvent= () => {
        const {dispatch} = this.props
        let {event} = this.state
        console.log(event);
        dispatch(create_event(event, fetch_events))
    }

    addDate = (e) => {
        e.preventDefault();

        this.setState({ popupOpen : true })

        let {event, dateIndex} = this.state
        event.dates.push({ date : moment(), times : [] })

        if(dateIndex == null)
            dateIndex = 0
        else
            dateIndex++

        this.setState({
            event : event,
            dateIndex : dateIndex
        })
    }
    stopPopup = (e) => {
        e.preventDefault();
        this.setState({ popupOpen : false })
    }
    addTime = () => {
        let {event, dateIndex} = this.state

        event.dates[dateIndex].times.push({ beginTime : "", endTime : ""})

        this.setState({
            event : event
        })
    }
    showTime = () => {
        let {event, dateIndex} = this.state
        if("undefined" !== typeof event.dates[dateIndex]){
            return event.dates[dateIndex].times.map((time, i) => {
                return(
                    <div key={i} >
                        <Input label="Begintijd" name="beginTime" value={time.beginTime} data-index={i} onChange={this.updateTime} />
                        <Input label="Eindtijd" name="endTime" value={time.endTime} data-index={i} onChange={this.updateTime} />
                    </div>
                )
            })
        }
    }
    changeDate = (e) => {
        this.setState({ popupOpen : true })
        let {event, dateIndex} = this.state
        dateIndex = e.target.dataset.index

        this.setState({
            dateIndex : dateIndex
        })
    }
    viewDates = () => {
        let {event, dateIndex} = this.state
        return event.dates.map((event, i) => {
            return(
                <div key={i} >
                    Datum {i}
                    <div className="fa fa-pencil" data-index={i} onClick={this.changeDate}></div>
                    <div className="fa fa-trash-o" data-index={i} onClick={this.deleteDate}></div>
                </div>
            )
        })
    }
    deleteDate = (e) => {
        let {event, dateIndex} = this.state
        event.dates.splice(dateIndex, 1)
        this.setState({
            event : event
        })
    }
    changeDateName = () =>{
        let dateName = moment()
        if("undefined" !== typeof this.state.event.dates[this.state.dateIndex]){
            dateName = this.state.event.dates[this.state.dateIndex].date
        }
        return(
            <DatePicker dateFormat="DD/MM/YYYY" selected={dateName}  data-index={this.state.dateIndex}
            onChange={this.updateDate}/>
        )
    }

    render() {
        return (
            <Panel theme="info">
                <PanelHeader inverted theme="default">Maak nieuwe event aan</PanelHeader>
                    <div className="col-xs-12 col-md-6">
                        <Input label="Naam" name="name" onChange={this.update}/>
                        {this.viewDates()}
                        <Button onClick={this.addDate}>Datum toevoegen</Button><br/><br/>
                        <Overlay open={this.state.popupOpen}>
                            <Panel theme="info">
                                <PanelHeader inverted theme="default">
                                Datum toevoegen <Button onClick={this.stopPopup}>X</Button>
                                </PanelHeader>
                                {this.changeDateName()}<br/>
                                {this.showTime()}<br/>
                                <Button onClick={this.addTime}>+ Tijd</Button><br/>
                                <Button onClick={this.stopPopup}>Datum opslaan</Button>
                            </Panel>
                        </Overlay>
                        <Input label="Beschrijving" name="description" onChange={this.update} />
                        <Button onClick={this.saveEvent}>Opslaan</Button>
                    </div>
            </Panel>
        )
    }
}

export default connect()(ConfigureEvents)
