import React, { Component } from "react";
import logo from "./logo.svg";
import { store } from "./store";
import { Provider } from "react-redux";
import { GET_DATA } from "./Actions/actions";
import "./App.css";
import Splash from "./Components/LoginPage";
import LoginPage from "./Components/Login";
import Register from "./Components/Register";
import LandingContainer from "./Components/LandingContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  // componentDidMount() {
  //   console.log("component mounting");
  //   var myHeaders = new Headers();
  //   myHeaders.append("pragma", "no-cache");
  //   myHeaders.append("cache-control", "no-cache");

  //   var myInit = {
  //     method: "GET",
  //     headers: myHeaders
  //   };
  //   const uri = "workout";
  //   fetch("workout", myInit)
  //     .then(res => res.json())
  //     .then(newWorkouts => {
  //       console.log("what", newWorkouts);
  //       console.log("fetch payload", newWorkouts);
  //       // const parsedTabs = JSON.parse(JSON.stringify(newWorkouts));
  //       // console.log("var parsed tabs", parsedTabs);
  //       newWorkouts.testProp = "TEST";
  //       store.dispatch({
  //         type: GET_DATA,
  //         newWorkouts
  //       });
  //     });
  // }

  componentDidUpdate() {}

  render() {
    console.log("RENDERING STATE", store.getState());
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Splash} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LoginPage} />

            <Route exact path="/landing" component={LandingContainer} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
