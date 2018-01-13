/*global google*/

import React from 'react';
import _ from "lodash";
import axios from 'axios';
import fetch from "isomorphic-fetch";
import { compose, withProps, withHandlers, lifecycle } from "recompose";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCuJekd82uLE4ucliTj_RjpRFv7NMbKKXg&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 33.4642302, lng: -112.0013202 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.place_id}
          position={{ lat: marker.geometry.location.lat, lng: marker.geometry.location.lng }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
  );

export default class GMap extends React.Component {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  //   let FindNear = (req, res) => {
  //   axios.get("/parkingspot/findnear/?latitude=33.3742668&longitude=-111.9717266&distance=50")
  //     .then(response => {
  //       const parkingSpots = response.data;
  //       console.log("findnear parkingspot objects", parkingSpots);
  //       //foreach parkingspot in the parking spots array.. do something
  //       return parkingSpots;
  //     })
  //     .catch(err => res.json(err));
  // }

  componentDidMount() {

    let lat;
    let lng;
    let distance;

    let FindNear = (req, res) => {

      // /parkingspot/findnear/?latitude=33.3742668&longitude=-111.9717266&distance=50
      axios.get("parkingspot/findnear/?latitude=" + lat + "&longitude=" + lng + "&distance=" + distance)

        .then(res => res.json())
        .then(data => {
          const markerArray = [];

          this.setState({ markers: markerArray });
          console.log(markerArray)

          for (let i = 0; i < markerArray.length; i++) {
            markerArray.push(data.results[i])
          }
        })
        .catch(err => res.json(err))
    }
  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}