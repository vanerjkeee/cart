import React from 'react';
import PropTypes from 'prop-types';

class ItemCart extends React.Component {
  render() {
    const style = {width: '20%'};
    return (
      <tr>
        <td style={style}>{this.props.data.name}</td>
        <td style={style}>{this.props.data.price}RUB</td>
        <td style={style}>x{this.props.data.count}</td>
        <td style={style}>={this.props.data.sum}</td>
        <td style={style}>
          <button onClick={() => this.props.delete(this.props.data.categoryId, this.props.data.id)}>Delete</button>
        </td>
      </tr>
    )
  }
}

ItemCart.propTypes = {
  data: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired,
};

export default ItemCart
