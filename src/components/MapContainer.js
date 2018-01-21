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
          <Marker
            position={loc.position}
            key={loc.id}
            onClick={select(loc)}
          >
            {isSelected(loc) && <InfoWindow onCloseClick={select(null)}> 
              <div>
                <h1>{loc.name}</h1>
              </div>
            </InfoWindow>}
          </Marker>
        )}
      </GoogleMap>
    </div>
  )
}))

export default MapComponent
