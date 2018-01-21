import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

import LocationInfo from './LocationInfo'

const MapContainer = withScriptjs(withGoogleMap(({ state, select, addReading, inputChange }) => {
  return (
    <div>
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 40, lng: 35 }}
      >
        {state.locations.map(loc => 
          <LocationInfo
            state={state}
            location={loc}
            select={select}
            addReading={addReading}
            inputChange={inputChange}
            key={loc.id}
          />
        )}
      </GoogleMap>
    </div>
  )
}))

export default MapContainer
