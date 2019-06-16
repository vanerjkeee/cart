import React from 'react';
import ItemCart from "./ItemCart";
import PropTypes from 'prop-types';

class Cart extends React.Component {
  render() {
    const style = {width: '100%'};
    return (
      <div>
        <h1>Cart</h1>
        <div>
          <table style={style}>
            <tbody>{this.props.data.map(k => <ItemCart key={k.id} data={k} delete={this.props.delete}/>)}</tbody>
          </table>
        </div>
        <h2>Total</h2>
        {this.props.cartSum} RUB
      </div>
    )
  }
}

Cart.propTypes = {
  data: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired,
  cartSum: PropTypes.string.isRequired
};

export default Cart
