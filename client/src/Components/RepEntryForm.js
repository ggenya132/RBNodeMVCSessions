import React, { Component } from "react";
import { SET_CHANGE, REP_CHANGE } from "../Actions/actions";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Button
} from "react-bootstrap";

export default class RepEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repValue: this.props.repValue || 0,
      loadHasBeenTouched: false
    };
  }

  componentDidUpdate() {
    console.log("UPDATING REP VALUE", this.props.repValue);
    if (
      Number.isInteger(parseInt(this.props.repValue)) &&
      this.state.repValue === 0 &&
      parseInt(this.props.repValue) > 0
    ) {
      this.setState(prevState => ({
        ...prevState,
        repValue: this.props.repValue
      }));
    }
  }

  onSelect = () => {
    this.props.dispatch({
      type: SET_CHANGE,
      newCurrentActiveSet: this.props.repIndex
    });
  };

  getValidationState = () => {
    let length = this.state.repValue.length;
    if (length === 0 && this.state.loadHasBeenTouched) {
      return "error";
    } else if (parseInt(this.state.repValue) !== NaN && length > 0) {
      return "success";
    }
  };

  onChange = e => {
    this.setState({ repValue: e.target.value, loadHasBeenTouched: true });
    this.props.dispatch({ type: REP_CHANGE, newSetValue: e.target.value });
  };

  render() {
    return (
      <div>
        <Form inline>
          <FormGroup
            validationState={this.getValidationState()}
            controlId="formInlineName"
          >
            <span> Set {this.props.repIndex + 1}</span>
            <ControlLabel>Reps performed: </ControlLabel>
            <FormControl
              onSelect={this.onSelect}
              value={this.state.repValue}
              onChange={this.onChange}
              type="number"
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}
