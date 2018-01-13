import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
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
import { RegisterPage } from '../RegisterPage';
import { CreateVehicleForm } from '../VehicleForms';
import { CreateParkingSpotForm } from '../ParkingSpotForms';
import { Navbar } from '../components/Navbar';
import Wrapper from '../components/Wrapper';
import Footer from '../components/Footer';
import  NotFound  from '../NotFound';






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
    <div>
      {alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      <Router history={history}>
        <div>
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }           
              <Wrapper> 
                <Switch>          
                <Route exact path="/logindriver" component={DriverLoginPage} />
                <Route exact path="/" component={RegisterPage} />
                <Route exact path="/loginowner" component={OwnerLoginPage} />
                <Route exact path="/logindriver" component={DriverLoginPage} />
                <Route exact path="/createvehicle" component={CreateVehicleForm} />
                <Route exact path="/createparkingspot" component={CreateParkingSpotForm} />
                <PrivateDriverRoute exact driverAuth={driverAuthentication} path="/driverhomepage" component={DriverHomePage} />
                <PrivateOwnerRoute exact ownerAuth={ownerAuthentication} path="/ownerhomepage" component={OwnerHomePage} />
                <Route path="*" component={NotFound} />
                </Switch>
            </Wrapper>
        </div> 
      </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  const { alert, driverAuthentication, ownerAuthentication } = state;
  return {
    alert, driverAuthentication, ownerAuthentication
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
