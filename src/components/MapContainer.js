import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

import LocationInfo from './LocationInfo'

const MapComponent = withScriptjs(withGoogleMap(({ locations, temps, select, isSelected }) => {
  return (
    <div>
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 40, lng: 35 }}
      >
        {locations.map(loc => 
          <LocationInfo
            location={loc}
            temps={temps.filter(temp => temp.locId === loc.id)[0]}
            select={select}
            isSelected={isSelected}
            key={loc.id}
          />
        )}
      </GoogleMap>
    </div>
  )
}))

export default MapComponent
