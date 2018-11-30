import React, { Component } from "react";
import ExerciseForm from "./ExerciseForm";
import { Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      postLoadingContent: "",
      postContentState: "0"
    };
    console.log(this.props);
  }

  onClick = e => {
    const paylod = this.props.workouts[this.props.index];
    console.log(paylod);
    console.log("SENDING PAYLOAD", paylod);
    const uri = `workout/${this.props.selectedWorkout.title}`;
    this.setState({
      isLoading: true,
      postLoadingContent: "Workout submitted",
      postContentState: "1"
    });
    fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(paylod)
    }).then(res => {
      res.json();
      console.log("done!");
      this.setState(prevState => ({
        ...prevState,
        isLoading: false
      }));
      setTimeout(
        () =>
          this.setState(prevState => ({
            ...prevState,
            postContentState: "0"
          })),
        1000
      );
    });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        {this.props.selectedWorkout.exercises.map((exercise, index) => (
          <ExerciseForm
            dispatch={this.props.dispatch}
            pushStateBack={this.pushStateBack}
            selectedExercise={exercise}
            key={index}
            index={index}
          />
        ))}

        <Button onClick={this.onClick} bsStyle="primary" bsSize="large">
          Submit
        </Button>
        <div className="loading-content">
          {this.state.isLoading ? (
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : (
            <Alert
              style={{ opacity: this.state.postContentState }}
              bsStyle="info"
            >
              <strong>{this.state.postLoadingContent}</strong>
            </Alert>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ workouts }) => ({ workouts });
export default connect(mapStateToProps)(Workout);
