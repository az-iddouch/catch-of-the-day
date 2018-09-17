import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Enventory from './Enventory';
import sampleFishes from '../sample-fishes';
// import Rebase from 're-base';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    // Initial State
    this.state = {
      fishes: {},
      order: {}
    }
  }

  // life sycle hooks
  componentDidMount() {
    // this runs right before <App /> is rendered
    // Sync our state with firebase
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    });

    // Check if there's any Order in LC
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
    if(localStorageRef) {
      // Update our App Component Order state 
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  // life sycle hooks
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(this.state.order));
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish = key => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
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
            { 
              Object.keys(this.state.fishes)
                .map(key => <Fish 
                  key={key} 
                  index={key} 
                  details={this.state.fishes[key]} 
                  addToOrder={this.addToOrder} />) 
            }
          </ul> 
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          params={this.props.match.params} 
          removeFromOrder={this.removeFromOrder}
        />
        <Enventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes} 
          updateFish={this.updateFish} 
          removeFish={this.removeFish}
        />
      </div>
    )
  }
}

export default App;