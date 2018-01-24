import React from 'react'

const CurrentTemp = ({ locName, temps }) =>
  temps ?
    <h2>{`${locName} ${temps.curr}°C`}</h2> :
    <h2>{locName}</h2>

export default CurrentTemp
