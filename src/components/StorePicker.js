import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';



class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  static propTypes = {
    history: PropTypes.object
  }

  storeInput = React.createRef();

  goToStore(event) {
    event.preventDefault();
    // Grab the text from the box
    // the first .value is a react thing and the second is a js thing
    const storeName = this.storeInput.value.value;
    // Transition to '/' to '/store/:something'
    // The router will add a history object to your component in the props hash. So in your component
    this.props.history.push(`/store/${storeName}`) 
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        {/* this is a react comment */}
        <h2>Please Enter a store</h2>
        <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={this.storeInput} ></input>
        <button type="submit">visite store </button>
      </form>
    )
  }
}


export default StorePicker;
