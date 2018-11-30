import React, { Component } from "react";
import RepEntryForm from "./RepEntryForm";
import { EXERCISE_CHANGE, LOAD_CHANGE } from "../Actions/actions";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Button,
  Panel
} from "react-bootstrap";

export default class ExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadHasBeenTouched: false,
      loadValue: this.props.selectedExercise.load || 0
    };
  }

  onSelect = () => {
    this.props.dispatch({
      type: EXERCISE_CHANGE,
      newCurrentActiveExercise: this.props.index
    });
  };

  getGenericValidationHandlr(state, property) {
    return (state, property) => {
      console.log("being called");
      let length = state[property].length;
      if (length === 0 && state.loadHasBeenTouched) {
        return "error";
      } else if (parseInt(state[property]) !== NaN && length > 0) {
        return "success";
      }
    };
  }

  onChange = e => {
    this.setState({ loadValue: e.target.value, loadHasBeenTouched: true });
    this.props.dispatch({ type: LOAD_CHANGE, newLoadValue: e.target.value });
  };
  componentDidUpdate() {
    if (
      Number.isInteger(parseInt(this.props.selectedExercise.load)) &&
      this.state.loadValue === 0
    ) {
      this.setState(prevState => ({
        ...prevState,
        loadValue: this.props.selectedExercise.load
      }));
    }
  }

  getValidationState = () => {
    let length = this.state.loadValue.length;
    if (length === 0 && this.state.loadHasBeenTouched) {
      return "error";
    } else if (parseInt(this.state.loadValue) !== NaN && length > 0) {
      return "success";
    }
  };
  pushStateBack = payload => {
    const newArray = this.props.selectedExercise.performedReps.map(
      (performedRep, index) => {
        if (index === payload.repIndex) {
          return payload.repValue;
        } else {
          return performedRep;
        }
      }
    );
    this.props.selectedExercise.performedReps = newArray;
  };
  render() {
    return (
      <div>
        <Panel>
          <Panel.Heading>{this.props.selectedExercise.title}</Panel.Heading>
          <Panel.Body>
            <span>{this.props.selectedExercise.suggestedSets}</span>*
            <span>{this.props.selectedExercise.suggestedReps}</span>@
            <span>{this.props.selectedExercise.rpe}</span>
            RPE
            <div>
              <Form inline>
                <FormGroup
                  validationState={this.getValidationState()}
                  controlId="formInlineName"
                >
                  <ControlLabel>Load</ControlLabel>
                  <FormControl
                    onSelect={this.onSelect}
                    value={this.state.loadValue}
                    onChange={this.onChange}
                    type="number"
                  />
                </FormGroup>
              </Form>

              {this.props.selectedExercise.performedReps.map(
                (performedRep, index) => {
                  return (
                    <RepEntryForm
                      dispatch={this.props.dispatch}
                      repIndex={index}
                      repValue={performedRep}
                    />
                  );
                }
              )}
            </div>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
