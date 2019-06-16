import React from 'react';
import Item from "./Item";
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const style = {width: '100%'};
    return (
      <div>
        <div>{this.props.data.name}<br/>
          <table style={style}>
            <tbody>{this.props.data.items.map(k => <Item key={k.id} data={k} add={this.props.add}/>)}</tbody>
          </table>
        </div>
        <br/>
      </div>
    )
  }
}

Category.propTypes = {
  data: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired
};

export default Category
