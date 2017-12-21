import React, { Component } from 'react';
import '../style/App.css';
import ParkingSpace_List from '../containers/parkingSpace_list';
import ParkingSpaceDetail from '../containers/parkingSpace_detail';
import SearchBar from '../containers/search_bar';

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


