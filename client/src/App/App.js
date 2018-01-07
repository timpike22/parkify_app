import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../style/App.css';
import ParkingSpace_List from '../containers/ParkingSpaceList';
import ParkingSpaceDetail from '../containers/ParkingSpaceDetail';
import SearchBar from '../containers/SearchBar';
import { DriverLoginPage } from '../DriverLogin';
import { OwnerLoginPage } from '../OwnerLogin';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateDriverRoute } from '../components';
import { PrivateOwnerRoute } from '../components';
import { DriverHomePage } from '../DriverHome';
import { OwnerHomePage } from '../OwnerHome';
import { OwnerRegisterPage } from '../OwnerLogin';
import { DriverRegisterPage } from '../DriverLogin';



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
    const { alert, ownerAuthentication, driverAuthentication } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <div>
                <PrivateOwnerRoute exact ownerAuth={ownerAuthentication} path="/owner" component={OwnerHomePage} />
                <PrivateOwnerRoute exact ownerAuth={driverAuthentication} path="/owner" component={DriverHomePage} />
                <Route exact path="/register/owner" component={OwnerRegisterPage} />
                <Route exact path="/register/driver" component={DriverRegisterPage} />
                <Route exact path="/" component={OwnerLoginPage} />
                <Route exact path="/" component={DriverLoginPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  const { alert, ownerAuthentication } = state;
  return {
    alert, ownerAuthentication
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
