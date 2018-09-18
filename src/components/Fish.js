import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }

  render() {
    const { index } = this.props;
    const { name, image, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';
    const btnText = isAvailable ? 'Add To Order' : 'Sold Out'

    return (
      <li className="menu-fish">
        <img src={ image } alt={ name } ></img>
        <h3 className="fish-name">
          { name }
          <span className="price">{ formatPrice(price) }</span>
        </h3>
        <p>{ desc }</p>
        <button onClick={() => this.props.addToOrder(index)} disabled={ !isAvailable }>{ btnText }</button>
      </li>
    )
  }
}

export default Fish;