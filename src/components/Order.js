import React from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const transitionOptions = {
      classNames: "order", 
      key,
      timeout: {enter:500, exit: 500}
    }

    // don't render anything until we have the fishes back from firebase
    if(!fish) return null;

    if(!fish || fish.status === 'unavailable' ){
      return(
      <CSSTransition {...transitionOptions}> 
        <li key={key}>Sorry, { fish ? fish.name : 'fish' } is no longer available! 
          <button onClick={() => this.props.removeFromOrder(key) }>&times;</button>
        </li>
      </CSSTransition>      
      )
    }

    return (
      <CSSTransition {...transitionOptions}> 
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
                <span>{ count } </span> 
              </CSSTransition>
            </TransitionGroup>
            lbs { fish.name } 
            <span className="price">{ formatPrice(count * fish.price) }</span>
            <button onClick={() => this.props.removeFromOrder(key) }>&times;</button>
          </span>
        </li>
      </CSSTransition>
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
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your order</h2>

        <TransitionGroup component="ul" className="order">
          { 
            // or we can just write this.renderOrder (without passig the 'key' or using an arrow function)
            orderIds.map(key => this.renderOrder(key)) 
          }
        </TransitionGroup>
          <div className="total">
             Total :
            <strong>{ formatPrice(total) }</strong>
            
          </div>
      </div>
    )
  }
}

export default Order;