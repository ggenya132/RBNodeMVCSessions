import React, { Component } from "react";
import { connect } from "react-redux";
import Workout from "./Workout";
import Tabs from "./Tabs";
import Landing from "./LandingPage";
import PastWorkoutModal from "./PastWorkoutModal";
import { Route, Redirect } from "react-router";

class LandingContainer extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { userIsAuthenticated } = this.props;
    return (
      <div>
        {userIsAuthenticated ? (
          <div>
            <Landing />
            <PastWorkoutModal />
            <Tabs />{" "}
          </div>
        ) : (
          <div>
            <Redirect to="/login" />;
          </div>
        )}
        {/* <Landing />
        <PastWorkoutModal />
        <Tabs /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ userIsAuthenticated }) => ({ userIsAuthenticated });
export default connect(mapStateToProps)(LandingContainer);
