import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Enventory from './Enventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    // Initial State
    this.state = {
      fishes: {},
      order: {}
    }
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    }) 
  }

  addFish(fish) {
    // update our state
    // first make a copy of our state
    const fishes = {...this.state.fishes};
    // add in our fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set State
    this.setState({ fishes });
  }

  addToOrder(key) {
    // Take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Fish" />
          <ul className="list-of-fishes">
            { Object.keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />) }
          </ul> 
        </div>
        <Order/>
        <Enventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;