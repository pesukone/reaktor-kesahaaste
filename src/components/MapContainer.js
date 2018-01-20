import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoVisible: false,
      activeMarker: {},
      selectedLocation: {}
    }
  }

  markerClicked = (props, marker, e) => {
    this.setState({
      infoVisible: true,
      activeMarker: marker,
      selectedLocation: props
    })
  }

  mapClicked = (props) => {
    if (this.state.infoVisible) {
      this.setState({
        activeMarker: null,
        infoVisible: false
      })
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={3}
        initialCenter={{
          lat: 40,
          lng: 35
        }}>
        {this.props.locations.map(loc => 
          <Marker
            onClick={this.markerClicked}
            name={loc.name}
            position={loc.position}
            key={loc.name}
          />
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.infoVisible}
        >
          <div>
            <h1>{this.state.selectedLocation.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCMh8h0ZICtnm-NRLEz2ya1X8odVGh_Abw"
})(MapContainer)
