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
import Navbar  from '../components/Navbar';
import Wrapper from '../components/Wrapper';
import Footer from '../components/Footer';



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
      <Navbar />
      <Wrapper>
          <PrivateOwnerRoute exact ownerAuth={ownerAuthentication} path="/owner" component={OwnerHomePage} />
          <PrivateDriverRoute exact driverAuth={driverAuthentication} path="/driver" component={DriverHomePage} />
          <Route exact path="/" component={OwnerRegisterPage} />
          <Route exact path="/register/driver" component={DriverRegisterPage} />
          <Route exact path="/login/owner" component={OwnerLoginPage} />
          <Route exact path="/login/driver" component={DriverLoginPage} />
          {/*<Route exact path="/" component={} />*/}
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
