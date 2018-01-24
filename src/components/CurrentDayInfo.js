import React from 'react'

const CurrentDayInfo = ({ temps }) => {
  if (temps) {
    return (
      <div>
        <h3>Last 24h:</h3>
        highest: {`${temps.hi}°C`}
        <br />
        lowest: {`${temps.lo}°C`}
      </div>
    )
  } else {
    return (
      <b>no temperature data available</b>
    )
  }
}

export default CurrentDayInfo
