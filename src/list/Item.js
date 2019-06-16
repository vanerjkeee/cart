import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {red: false, green: false};
    this.clearStyle = this.clearStyle.bind(this);
  }

  //clear item backlight
  clearStyle() {
    this.setState({red: false, green: false, minCount: false});
  }

  //handle add to cart click
  addToCart() {
    //add red backlight if product count = 0
    if (this.props.data.count === 0) {
      this.setState({minCount: true});
      setTimeout(this.clearStyle, 1000);
    }
    this.props.add(this.props.data.categoryId, this.props.data.id)
  }

  //compare old and new prices and add backlight if needed
  componentDidUpdate(prevProps) {
    if (parseFloat(prevProps.data.price) < parseFloat(this.props.data.price)) {
      this.setState({red: true});
      setTimeout(this.clearStyle, 1000)
    } else if (parseFloat(prevProps.data.price) > parseFloat(this.props.data.price)) {
      this.setState({green: true});
      setTimeout(this.clearStyle, 1000)
    }
  }

  render() {
    const style = {width: '25%'};
    let styleCount = style;
    let stylePrice = style;

    if (this.state.minCount) {
      styleCount = {width: '25%', color: 'red', fontWeight: 'bold', backgroundColor: 'pink'}
    }

    if (this.state.red) {
      stylePrice = {width: '25%', color: 'red', fontWeight: 'bold', backgroundColor: 'pink'}
    } else if (this.state.green) {
      stylePrice = {width: '25%', color: 'green', fontWeight: 'bold', backgroundColor: 'mintcream'}
    }
    return (
      <tr>
        <td style={style}>{this.props.data.name}</td>
        <td style={styleCount}>{this.props.data.count}</td>
        <td style={stylePrice}>{this.props.data.price} RUB</td>
        <td style={style}>
          <button onClick={() => this.addToCart()}>Add to card</button>
        </td>
      </tr>
    )
  }
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired
};

export default Item
