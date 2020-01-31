import React, { Component } from 'react';
import { EditAction } from './editor/index';
import { EventsTable } from './Events';


export default class Action extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            newEvents: []
        }
    }
    render() {
        return <div>
            <h1>Edit action</h1>
            <EditAction user={this.props.user} actionId={this.props.match.params.id} />
            
            <hr />

            <h2>Events</h2>
            <EventsTable fixedFilters={{action_id: this.props.match.params.id}} history={this.props.history} />
        </div>
    }
}