import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Enventory from './Enventory';

class App extends React.Component {
  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Fish" />
          <Fish/>
        </div>
        <Order/>
        <Enventory/>
      </div>
    )
  }
}

export default App;