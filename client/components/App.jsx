import React from 'react';
import axios from 'axios';

import Slider from './Slider';

require('./../styles/app.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.switchShoe = this.switchShoe.bind(this);
    this.state = {
      productSku: 100,
      products: [],
      slideFrom: 0,
      slideTo: 0,
    };
  }

  componentDidMount() {
    this.requestImgs();
  }

  requestImgs() {
    axios.get(`${this.state.productSku}/similar`)
      .then(res => this.setState({ products: res.data }));
  }

  slideLeft() {
    this.setState(previous => ({
      slideFrom: previous.slideTo,
      slideTo: previous.slideTo - 100,
    }));
  }

  slideRight() {
    this.setState(previous => ({
      slideFrom: previous.slideTo,
      slideTo: previous.slideTo + 100,
    }));
  }

  switchShoe(sku) {
    this.setState({
      productSku: sku,
      products: [],
      slideFrom: 0,
      slideTo: 0,
    });
    this.requestImgs();
  }

  render() {
    return (
      <div id="carousel">
        <h1>YOU MAY ALSO LIKE</h1>
        <div id="outer-wrapper">
          <button className={this.state.slideTo === 0 ? 'prev inviz' : 'prev'} type="button" onClick={this.slideRight}>
            <i className="material-icons prev">navigate_before</i>
          </button>
          <div id="inner-wrapper">
            {
              this.state.products.length === 0
                ? <div>Loading...</div>
                : (
                  <Slider
                    products={this.state.products}
                    handleClick={this.switchShoe}
                    slideFrom={this.state.slideFrom}
                    slideTo={this.state.slideTo}
                  />
                )

            }
          </div>
          <button className={this.state.slideTo === -200 ? 'next inviz' : 'next'} type="button" onClick={this.slideLeft}>
            <i className="material-icons next">navigate_next</i>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
