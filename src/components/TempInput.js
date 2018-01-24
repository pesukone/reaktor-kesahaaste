import React from 'react'

const TempInput = ({ addReading, tempVal, inputChange }) => {
  return (
    <div>
      <h3>Add reading (°C):</h3>
      <form onSubmit={addReading}>
        <input
          value={tempVal}
          onChange={inputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default TempInput
