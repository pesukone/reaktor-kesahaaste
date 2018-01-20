import React from 'react'

import MapContainer from './components/MapContainer'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    const { locations } = props
    this.state = {
      locations: locations
    }
  }

  render() {
    return (
      <MapContainer locations={this.state.locations} />
    )
  }
}

export default App;
