import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Media, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Toast from "react-bootstrap/Toast";
import { FadeTransform } from 'react-animation-components';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showToast: false,
      ModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);

  }

  toggleModal() {
    this.setState({
      ModalOpen: !this.state.ModalOpen
    });
  }

  checkIsUserLogin() {
    const currentUser = sessionStorage.getItem('user');
    if (currentUser == null) {
      this.setState({
        ModalOpen: true
      });
      return false;
    } else {
      this.setState({
        ModalOpen: false
      });
      return true;
    }
  }

  //Method to update cart item when user click "add to cart"
  updateCart = (pid, pname, pimage, pprice, punit, evt) => {
    evt.preventDefault();

    if (this.checkIsUserLogin()) {
      var cartArr = [];                                           //array to hold objects of cart items
      var objSelected = { id: pid, name: pname, qty: 1, image: pimage, price: pprice, unit: punit }; //obj to store cart item
      var cart = localStorage.getItem('cart');                    //get cart items from storage       
      if (cart == null) {                                         //if no existing cart items
        console.log("there is no localstorage cart");
        cartArr.push(objSelected)                                 //create cart items
        localStorage.setItem('cart', JSON.stringify(cartArr));    //convert obj to string for storage
        console.log(cartArr)
        this.setState({ cartcount: cartArr.length });

      } else {                                                     //if no existing cart items
        console.log("exist localstorage cart 99999");
        cartArr = JSON.parse(cart);                               //covert string from storage to obj
        console.log(cartArr)

        //check is product already in cart, if in cart increase qty
        var indexFound = cartArr.findIndex(function (item, index) {
          if (item.id === pid) {
            return true
          }
        });
        console.log("found:" + indexFound)
        if (indexFound < 0) {
          console.log("not in cart")
          cartArr.push(objSelected);                                //add in new cart item to existing list
          localStorage.setItem('cart', JSON.stringify(cartArr));    //convert obj to string for storage
        } else {
          console.log("in cart index : " + indexFound)
          cartArr[indexFound].qty = cartArr[indexFound].qty + 1             //add in new cart item to existing list
          localStorage.setItem('cart', JSON.stringify(cartArr));    //convert obj to string for storage
        }

        console.log(cartArr.length)
        this.setState({ cartcount: cartArr.length });
      }
      this.setState({ showToast: true });

    }
  }



  render() {

    return (

      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to='/products'>Products</Link></BreadcrumbItem>
          <BreadcrumbItem active>{this.props.productSelected.name}</BreadcrumbItem>
        </Breadcrumb>

        <Modal isOpen={this.state.ModalOpen} size="sm" centered="true">
          <ModalBody>Please log in to start shopping.</ModalBody>
          <ModalFooter><Button color="secondary" onClick={this.toggleModal}>OK</Button></ModalFooter>
        </Modal>

        <FadeTransform in
          transformProps={{ exitTransform: 'scale(1.0) translateX(-10%)' }}>

          <hr />
          <Link to='/products'><span className="fa fa-chevron-left"></span> Back</Link>

          <br /><br />
          <div className="row">
            <div className="col-12 col-md-5">

              <Media middle>
                <Media object src={this.props.productSelected.image} alt={this.props.productSelected.name} />
              </Media>
            </div>
            <div className="col-12 col-md-6">
              <Media body>
                <Media heading>{this.props.productSelected.name}</Media>
            ${this.props.productSelected.price.toFixed(2)} {this.props.productSelected.unit}
                <br />
                {this.props.productSelected.description}
              </Media>
              <br />
              <Button outline color="primary" size="sm"
                onClick={e => this.updateCart(`${this.props.productSelected.id}`, `${this.props.productSelected.name}`, `${this.props.productSelected.image}`, `${this.props.productSelected.price}`, `${this.props.productSelected.unit}`, e)}>
                <span className="fa fa-cart-plus fa-lg"></span> Add to cart
              </Button>
              {"  "}

            </div>
          </div>
          <br /><br />
        </FadeTransform>
        <hr />
        <Toast
          style={{
            position: 'absolute',
            top: 75,
            right: 0,
            color: '#ffffff',
            backgroundColor: '#5cb85c',
          }}
          show={this.state.showToast} onClose={() => {
            this.setState({ showToast: false });
          }
          } delay={3000} autohide>

          <Toast.Body>
            <span className="fa fa-check" aria-hidden="true"></span> Item added to cart succesfully.
          </Toast.Body>
        </Toast>
      </div>
    )
  }

}
export default ProductDetail;