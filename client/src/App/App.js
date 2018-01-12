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
import { RegisterPage } from '../RegisterPage';
import { OwnerRegisterPage } from '../OwnerLogin';
import { DriverRegisterPage } from '../DriverLogin';
import { CreateVehicleForm } from '../VehicleForms';
import { CreateParkingSpotForm } from '../ParkingSpotForms';
import { Navbar } from '../components/Navbar';
import Wrapper from '../components/Wrapper';
import Footer from '../components/Footer';
import  Dashboard  from '../darnell'





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
          
            <div className="container">
              <Wrapper>           
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/logindriver" component={DriverLoginPage} />
                <Route exact path="/" component={RegisterPage} />
                <Route exact path="/register/owner" component={OwnerRegisterPage} />
                <Route exact path="/register/driver" component={DriverRegisterPage} />
                <Route exact path="/login/owner" component={OwnerLoginPage} />
                <Route exact path="/login/driver" component={DriverLoginPage} />
                <Route exact path="/create/vehicle" component={CreateVehicleForm} />
                <Route exact path="/create/parkingspot" component={CreateParkingSpotForm} />
                <PrivateDriverRoute exact driverAuth={driverAuthentication} path="/driverhomepage" component={DriverHomePage} />
                <PrivateOwnerRoute exact ownerAuth={ownerAuthentication} path="/ownerhomepage" component={OwnerHomePage} />
            </Wrapper>
          </div>
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
