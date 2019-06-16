import React from 'react';
import Category from "./Category";
import PropTypes from 'prop-types';

class List extends React.Component {
  render() {
    return (
      <div>
        <h1>Products</h1>
        <h2>USDRUB {this.props.rate}</h2>
        <div>
          {this.props.data.map(k => <Category key={k.id} data={k} add={this.props.add}/>)}
        </div>
        <br/>
      </div>
    )
  }
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  rate: PropTypes.string.isRequired
};

export default List
