import React from 'react'

import MapContainer from './components/MapContainer'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [
        {
          name: "Helsinki",
          position: {
            lat: 60.1697530,
            lng: 24.9490830
          }
        }
      ]
    }
  }

  render() {
    return (
      <MapContainer locations={this.state.locations} />
    )
  }
}

export default App;
