import React from 'react'
import {
  withScriptjs, withGoogleMap,
  GoogleMap, Marker, InfoWindow
} from 'react-google-maps'

const MapComponent = withScriptjs(withGoogleMap(({ locations, toggleInfo, select, isSelected }) => {
  return (
    <div>
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 40, lng: 35 }}
      >
        {locations.map(loc => 
          <LocationMarker
            location={loc}
            select={select}
            isSelected={isSelected}
            key={loc.id}
          />
        )}
      </GoogleMap>
    </div>
  )
}))

const LocationMarker = ({ location, select, isSelected }) => {
  return (
    <Marker
      position={location.position}
      onClick={select(location)}
    >
      {isSelected(location) && <InfoWindow onCloseClick={select(null)}>
        <div>
          <h2>{location.name}</h2>
          <p>Current temperature: {`${location.temperature}°C`}</p>
        </div>
      </InfoWindow>}
    </Marker>
  )
}

export default MapComponent
