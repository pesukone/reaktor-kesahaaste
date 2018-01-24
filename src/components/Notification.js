import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      <font color={isError ? "red" : "green"}>{message}</font>
    </div>
  )
}

export default Notification
