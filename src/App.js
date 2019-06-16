import React from 'react';
import {store} from './env/names.js';
import List from "./list/List";
import Cart from "./cart/Cart";
import {cfg} from "./env/config";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.parseResponse = this.parseResponse.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.state = {
      isFetching: true,
      data: [],
      error: false,
      cart: [],
      cartSum: "0.00",
      rate: 0,
    };
  }

  //parse data.json, group products into object, add names from names.js
  parseResponse(result) {
    //generate USDRUB exchange rate
    const rate = Math.random() * 60 + 20;

    //check success answer
    if (!result.Success) {
      this.setState({error: true})
    } else {
      let data = [];
      result.Value.Goods.forEach(function (element) {
        if (!data[element.G]) {
          data[element.G] = {id: element.G, name: store[element.G].G, items: []};
        }
        let price = parseFloat(element.C) * rate;
        data[element.G].items[element.T] = {
          id: element.T,
          name: store[element.G]['B'][element.T].N,
          price: price.toFixed(2),
          count: element.P,
          categoryId: element.G
        }
      });
      const oldcart = this.state.cart;
      this.setState({error: false, isFetching: false, data: data, cart: [], cartSum: "0.00", rate: rate.toFixed(2)});

      //return products to cart after refreshing exchange rate
      const addToCart = this.addToCart;
      oldcart.forEach(function (element) {
        addToCart(element.categoryId, element.id, element.count);
      })
    }
  }

  //get data.json XHR
  fetchData() {
    const setState = this.setState;
    fetch(cfg.apiHost + `/data.json`)
    .then(response => response.json())
    .then(result => {
      this.parseResponse(result)
    })
    .catch(function (error) {
      setState({error: true});
    })
  }

  //on component load get data.json and start timer
  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 5000);
  }

  //handle add to cart click
  addToCart(cat, id, count = 1) {
    this.setState(state => {
      let newcart = state.cart;
      let newdata = state.data;

      //product is not available
      if (newdata[cat].items[id].count === 0) {
        return;
      }

      newdata[cat].items[id].count -= count;
      if (!newcart[id]) {
        const sum = parseFloat(newdata[cat].items[id].price) * count;
        newcart[id] = {
          id: id,
          categoryId: cat,
          name: store[cat]['B'][id].N,
          count: count,
          price: newdata[cat].items[id].price,
          sum: sum.toFixed(2)
        };
      } else {
        newcart[id].count += count;
        newcart[id].sum = parseFloat(newcart[id].sum) + parseFloat(newdata[cat].items[id].price) * count;
        newcart[id].sum = newcart[id].sum.toFixed(2);
      }
      let cartSum = parseFloat(state.cartSum) + parseFloat(newcart[id].price) * count;

      return {cart: newcart, data: newdata, cartSum: cartSum.toFixed(2)};
    })
  }

  //handle delete from cart click
  deleteFromCart(cat, id) {
    this.setState(state => {
      let newcart = state.cart;
      let newdata = state.data;
      let cartSum = state.cartSum;

      const price = newdata[cat].items[id].price;
      cartSum = parseFloat(cartSum) - parseFloat(price);
      newdata[cat].items[id].count++;
      newcart[id].count--;
      newcart[id].sum = parseFloat(newcart[id].sum) - parseFloat(price);
      newcart[id].sum = newcart[id].sum.toFixed(2);
      if (newcart[id].count === 0) {
        delete newcart[id];
      }
      return {cart: newcart, data: newdata, cartSum: cartSum.toFixed(2)};
    })
  }

  render() {
    return (
      <div>
        {!this.state.error || 'Error'}
        {!this.state.isFetching || 'Loading...'}
        {this.state.isFetching || <List data={this.state.data} add={this.addToCart} rate={this.state.rate}/>}
        {this.state.isFetching ||
        <Cart data={this.state.cart} cartSum={this.state.cartSum} delete={this.deleteFromCart}/>}
      </div>
    )
  }
}

export default App;
