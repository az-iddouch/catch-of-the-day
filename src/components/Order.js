import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    if(!fish || fish.status === 'unavailable' ){
      return <li key={key}>Sorry, { fish ? fish.name : 'fish' } is no longer available! </li>
    }

    return (
      <li key={key}>
        <span>{ count }lbs { fish.name }</span>
        <span className="price">{ formatPrice(count * fish.price) }</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      // the key here is the current orderId 
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your order</h2>
        <ul className="order">
          { 
            // or we can just write this.renderOrder (without passig the 'key' or using an arrow function)
            orderIds.map(key => this.renderOrder(key)) 
          }
          <li className="total">
            <strong> Total </strong>
            { formatPrice(total) }
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;