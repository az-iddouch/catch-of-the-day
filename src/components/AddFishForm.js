import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
  // fishForm = React.createRef();
  name = React.createRef();
  price = React.createRef();
  status = React.createRef();
  desc = React.createRef();
  image = React.createRef();

  static propTypes = {
    addFish: PropTypes.func
  }

  createFish(e) {
    e.preventDefault();
    const fish = {
      name: this.name.value.value,
      price: parseFloat(this.price.value.value),
      status: this.status.value.value,
      desc: this.desc.value.value,
      image: this.image.value.value
    }
    console.log(fish)
    this.props.addFish(fish);
    e.currentTarget.reset();
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={e => this.createFish(e)}>
        <input ref={this.name} type="text" placeholder="Fish Name" />
        <input ref={this.price} type="text" placeholder="Fish Price" />
        <select ref={this.status}>
          <option value="available">Fresh !</option>
          <option value="unavailable">Sold Out !</option>
        </select>
        <textarea ref={this.desc} placeholder="Fish Desc"></textarea>
        <input ref={this.image} type="text" placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

export default AddFishForm;