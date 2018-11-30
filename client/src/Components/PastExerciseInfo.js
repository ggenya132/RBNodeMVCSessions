import React, { Component } from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

export default class PastExerciseInfo extends Component {
  render() {
    return (
      <div>
        <Panel>
          <Panel.Heading>{this.props.exercise.title}</Panel.Heading>
          <Panel.Body>Some default panel content here.</Panel.Body>
          <ListGroup>
            {this.props.exercise.performedReps.map(rep => {
              return <ListGroupItem>{rep}</ListGroupItem>;
            })}
            {/* <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>&hellip;</ListGroupItem> */}
          </ListGroup>
          <Panel.Body>Some more panel content here.</Panel.Body>
        </Panel>
      </div>
    );
  }
}
