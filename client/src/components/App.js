import React, { Component } from 'react';
import '../style/App.css';
import ParkingSpace_List from '../containers/ParkingSpaceList';
import ParkingSpaceDetail from '../containers/ParkingSpaceDetail';
import SearchBar from '../containers/SearchBar';

export default class App extends Component {
  render() {
    return (
      <div>
      <SearchBar />
      <ParkingSpace_List />
      <ParkingSpaceDetail />
      </div>
    );
  }
}


