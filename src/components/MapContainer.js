import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

const MapContainer = ({ google, locations }) => {
  return (
    <Map google={google} zoom={14}>
      {locations.map(loc => <Marker name={loc.name} position={loc.position} key={loc.name} />)}
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCMh8h0ZICtnm-NRLEz2ya1X8odVGh_Abw"
})(MapContainer)
