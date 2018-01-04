import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../style/App.css';
import ParkingSpace_List from '../containers/ParkingSpaceList';
import ParkingSpaceDetail from '../containers/ParkingSpaceDetail';
import SearchBar from '../containers/SearchBar';

import { LoginPage } from '../components';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateDriverRoute } from '../components';
import { PrivateOwnerRoute } from '../components';
import { HomePage } from '../components';
import { DriverHomePage } from '../components';
import { OwnerHomePage } from '../components';
import { OwnerRegisterPage } from '../components';
import { DriverRegisterPage } from '../components';



class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <div>
                <PrivateOwnerRoute exact path="/owner" component={OwnerHomePage} />
                <PrivateDriverRoute exact path="/driver" component={DriverHomePage} />
                <Route path="/login" component={OwnerRegisterPage} />
                <Route path="/register" component={OwnerRegisterPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
