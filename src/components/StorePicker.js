import React from 'react';
import { getFunName } from '../helpers';



class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    // Grab the text from the box
    console.log(this.storeInput.value);
    // Transition to '/' to '/store/:something'
    // The router will add a history object to your component in the props hash. So in your component
    this.props.history.push(`/store/${this.storeInput.value}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        {/* this is a react comment */}
        <h2>Please Enter a store</h2>
        <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} ></input>
        <button type="submit">visite store </button>
      </form>
    )
  }
}


export default StorePicker;
