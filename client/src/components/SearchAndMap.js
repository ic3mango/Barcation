import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PlacesWithStandaloneSearchBox from './SearchAutocomplete';
import GoogleMapWithMarkers from './Map';

class SearchAndMap extends Component {
  constructor(props) {
    super(props);
    const defaultLocation = {lat: 47.6062095, lng: -122.3320708};
    const storageLocation = JSON.parse(localStorage.getItem('locationBar'));

    const location = storageLocation || defaultLocation;

    this.state = {
      places: [],
      refs: {},
      location,
      repeatView: !!storageLocation,
      infoBar: null
    }
  }

  handleMarkerClick = (id) => {
    this.setState({
      infoBar: this.props.bars.filter(bar => bar.id === id)[0]
    });
  }

  handleInfoClose = () => {
    this.setState({
      infoBar: null
    });
  }

  yelpApiLngLat() {
    return {
      longitude: this.state.location.lng,
      latitude: this.state.location.lat
    }
  }

  panMapToLocation() {
    this.props.fetchBars(this.yelpApiLngLat());
    this.handleInfoClose();
    this.state.refs.customMap.panTo(this.state.location);
    localStorage.setItem('locationBar', JSON.stringify(this.state.location));
  }

  componentDidMount() {
    this.props.fetchBars(this.yelpApiLngLat());

    if (!this.state.repeatView) {
      const userLocation = {};
      navigator.geolocation.getCurrentPosition((res) => {
        userLocation.lng = res.coords.longitude;
        userLocation.lat = res.coords.latitude;
        this.setState({
          location: userLocation
        }, this.panMapToLocation);
      });
    }
  }

  onMapMounted = ref => this.setState({ refs: { ...this.state.refs, customMap: ref }});

  onSearchBoxMounted = ref =>
    this.setState({ refs: { ...this.state.refs, searchBox: ref } })

  onPlacesChanged = () => {
    const places = this.state.refs.searchBox.getPlaces();
    const lat = places[0].geometry.location.lat();
    const lng = places[0].geometry.location.lng();
    const location = { lat, lng };

    this.setState({ location }, this.panMapToLocation);

    this.setState({
      places,
    });
  }

  render() {
    return (
      <div>
        <PlacesWithStandaloneSearchBox
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />} updateStore={this.props.fetchBars}
          onPlacesChanged={this.onPlacesChanged}
          places={this.state.places}
          onSearchBoxMounted={this.onSearchBoxMounted}
        />
        <GoogleMapWithMarkers
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          barsToRender={this.props.bars}
          onMapMounted={this.onMapMounted}
          onMarkerClick={this.handleMarkerClick}
          onInfoClose={this.handleInfoClose}
          infoBar={this.state.infoBar}
          defaultCenter={this.state.location}
        />
      </div>
    );
  }
}

export default connect(null, actions)(SearchAndMap);
