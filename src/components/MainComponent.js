import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Products from './productComponent'
import Contact from './ContactComponent';
import Home from './HomeComponent';
import ProductDetail from './productDetailComponent';
import ProductsByCat from './productsByCatComponent';
import About from './AboutComponent'
import ShopCart from './CartComponent';
import { PRODUCTS } from '../shared/products';
import { Switch, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: PRODUCTS,
      isUserAuthenticated: this.checkIsUserLogin(),
      display: true,
      productsOnServer: [],
      loading: false,
    };
  }

  /*
  componentDidMount() {
    fetch("http://localhost:3001/products", {
      'method': 'GET'
    }).then(response => response.json())
      .then(data => {
        //console.log(data);
        this.setState({ productsOnServer: data });
        this.setState({ loading: false });
      })
  }
  */

  checkIsUserLogin() {
    const currentUser = sessionStorage.getItem('user');
    //console.log("main check user " + currentUser);
    if (currentUser == null) {
      return false;
    } else {
      return true;
    }
  }


  render() {
    //homepage props to display featured/New/Offer items
    //const show = this.state.product;
    //console.log(show.label)
    console.log(this.state.products[0].label)

    const HomePage = () => {

      return (
        <Home
          productFeatured={this.state.products.filter((product) => product.label === 'Featured')[0]}
          productNew={this.state.products.filter((product) => product.label === 'New')[0]}
          productOffer={this.state.products.filter((product) => product.label === 'Offer')[0]}

        />
      );
    }

    // it receives a `match` prop, which it
    const ProductWithId = ({ match }) => {
      /* Using the filter */
      return (
        <ProductDetail productSelected={this.state.products.filter((product) => product.id === parseInt(match.params.productId, 10))[0]} />
      );
    }

    const ProductsByCategory = ({ match }) => {
      /* Using the filter */
      return (
        <ProductsByCat productsbycat={this.state.products.filter((product) => product.category === match.params.category)} />
      );
    }

    //get cart items from local storage
    const GetShoppingCartItems = () => {
      console.log('invoke get shop cart in main')
      const cart = localStorage.getItem('cart');
      var objShopCart = JSON.parse(cart);
      return (
        <ShopCart shoppingcartitems={objShopCart} />
      );
    }


    return (

      <div>

        <Header />

        <Switch>
          {this.state.loading ? <div className="spinner"><CircularProgress /></div> : <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/products" component={() => <Products products={this.state.products} />} />
            <Route path="/productcategory/:category" component={ProductsByCategory} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            {!(this.checkIsUserLogin()) &&
              <Route exact path="/cart" component={HomePage} />
            }
            {this.checkIsUserLogin() &&
              <Route exact path="/cart" component={GetShoppingCartItems} />
            }
            <Route path="/products/:productId" component={ProductWithId} />
          </div>
          }
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;