import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import ViewPoll from "./ViewPoll";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          {authedUser !== null && <Nav />}
            <header>
              <LoadingBar />
            </header>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/login" />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/new" component={NewQuestion} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/viewpoll" component={ViewPoll} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

// to gain access to dispatch we need to connect
export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
