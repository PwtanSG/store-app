import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Badge, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import Toast from "react-bootstrap/Toast";
import { FadeTransform } from 'react-animation-components';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownCategoryOpen: false,
      dropdownSortOpen: false,
      categorySelected: 'All',
      sortSelected: 'None',
      cartcount: this.getCartCount(),
      showToast: false,
      ModalOpen: false,

    };

    this.toggleDropdownCategory = this.toggleDropdownCategory.bind(this);
    this.toggleDropdownSort = this.toggleDropdownSort.bind(this);
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

  toggleDropdownCategory() {
    this.setState(prevState => ({
      dropdownCategoryOpen: !prevState.dropdownCategoryOpen
    }));
  }

  changeCategorySelected(val, evt) {
    evt.preventDefault();                   //need to prevent evt error, if not cannot work
    this.setState({ categorySelected: val });
    console.log("Category selected:" + val)
  }

  toggleDropdownSort() {
    this.setState(prevState => ({
      dropdownSortOpen: !prevState.dropdownSortOpen
    }));
  }

  changeSortSelected(val, evt) {
    evt.preventDefault();                   //need to prevent evt error, if not cannot work
    this.setState({ sortSelected: val });
    //console.log("Sort selected:" + val)
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

  //Method to update cart item when user click "add to cart"
  getCartCount = () => {
    var cartArr = [];
    var cart = localStorage.getItem('cart');                    //get cart items from storage       
    if (cart == null) {                                         //if no existing cart items
      console.log("there is no localstorage cart");
      this.setState({ cartcount: 0 });
      return 0;

    } else {                                                    //if no existing cart items
      console.log("exist localstorage cart");
      cartArr = JSON.parse(cart);
      //this.setState({cartcount: cartArr.length});
      console.log(cartArr)
      console.log(cartArr.length)
      return cartArr.length
    }
  }

  compareName(a, b) {
    // Use toUpperCase() to ignore character casing
    const AObjName = a.name.toUpperCase();
    const BObjName = b.name.toUpperCase();

    let comparison = 0;
    if (AObjName > BObjName) {
      comparison = 1;
    } else if (AObjName < BObjName) {
      comparison = -1;
    }
    return comparison;
  }

  comparePrice(a, b) {
    // Use toUpperCase() to ignore character casing
    const AObjPrice = a.price;
    const BObjPrice = b.price;

    let comparison = 0;
    if (AObjPrice > BObjPrice) {
      comparison = 1;
    } else if (AObjPrice < BObjPrice) {
      comparison = -1;
    }
    return comparison;
  }


  getProductsByCategorySelected() {
    var productsByCategorySel;
    //console.log(this.state.categorySelected)
    this.state.categorySelected === 'Beverages' ?
      productsByCategorySel = this.props.products.filter((product) => product.category === this.state.categorySelected)

      : this.state.categorySelected === 'Fruits' ?
        productsByCategorySel = this.props.products.filter((product) => product.category === this.state.categorySelected)

        : this.state.categorySelected === 'Vegetables' ?
          productsByCategorySel = this.props.products.filter((product) => product.category === this.state.categorySelected)

          : this.state.categorySelected === 'Meat' ?
            productsByCategorySel = this.props.products.filter((product) => product.category === this.state.categorySelected)

            : this.state.categorySelected === 'Seafood' ?
              productsByCategorySel = this.props.products.filter((product) => product.category === this.state.categorySelected)

              : productsByCategorySel = this.props.products;

    return productsByCategorySel
  }


  componentDidMount() {

  }


  render() {
    var renderThisProducts = this.props.products;
    //filter props.products by category
    renderThisProducts = this.getProductsByCategorySelected();
    //Sort props.products by A-Z or Price
    if (this.state.sortSelected === "A-Z") {
      renderThisProducts = renderThisProducts.sort(this.compareName);
    }
    if (this.state.sortSelected === "Lowest Price") {
      renderThisProducts = renderThisProducts.sort(this.comparePrice);
    }

    const products = renderThisProducts.map((product) => {
      //determine label badge color  
      let labelColor = '';
      (product.label === 'Featured') ? labelColor = 'warning'
        : (product.label === 'New') ? labelColor = 'info'
          : (product.label === 'Hot') ? labelColor = 'danger'
            : (product.label === 'Offer') ? labelColor = 'success'
              : labelColor = 'dark';

      return (
        <div className="col-12 col-md-4 col-lg-3">
          <Card key={product.id}>
            <CardBody>
              <Link to={`/products/${product.id}`}>
                <CardText></CardText>
                <CardImg top src={product.image} alt={product.name} />
              </Link>
            </CardBody>
            <CardBody>
              <CardTitle>{product.name} <Badge color={labelColor}>{product.label}</Badge></CardTitle>
              <CardText>${product.price.toFixed(2)} {product.unit}</CardText>
              <Button outline color="primary" size="sm"
                onClick={e => this.updateCart(`${product.id}`, `${product.name}`, `${product.image}`, `${product.price}`, `${product.unit}`, e)}>
                <span className="fa fa-cart-plus fa-lg"></span> Add to cart
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(1.0) translateY(20%)'
        }}>
        <div className="container">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem>Products</BreadcrumbItem>
            <BreadcrumbItem active>{this.state.categorySelected}</BreadcrumbItem>
          </Breadcrumb>

          <Modal isOpen={this.state.ModalOpen} size="sm" centered="true">
            <ModalBody>
              Please log in to start shopping. <br />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModal}>OK</Button>
            </ModalFooter>
          </Modal>

          <h4>View Products {" "}<Button outline color="link">
            <span className="fa fa-shopping-cart fa-lg"></span>
            {" "}<Badge color="dark"> {this.state.cartcount}</Badge>
          </Button></h4>

          <ButtonGroup>
            <ButtonDropdown isOpen={this.state.dropdownCategoryOpen} toggle={this.toggleDropdownCategory} size="sm">
              <DropdownToggle split caret outline color="primary"> Categories - {this.state.categorySelected} </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={e => this.changeCategorySelected('All', e)}>View All</DropdownItem>
                <DropdownItem onClick={e => this.changeCategorySelected('Beverages', e)}>Beverages</DropdownItem>
                <DropdownItem onClick={e => this.changeCategorySelected('Fruits', e)}>Fruits</DropdownItem>
                <DropdownItem onClick={e => this.changeCategorySelected('Vegetables', e)}>Vegetables</DropdownItem>
                <DropdownItem onClick={e => this.changeCategorySelected('Meat', e)}>Meat</DropdownItem>
                <DropdownItem onClick={e => this.changeCategorySelected('Seafood', e)}>Seafood</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown isOpen={this.state.dropdownSortOpen} toggle={this.toggleDropdownSort} size="sm">
              <DropdownToggle split caret outline color="primary"> Sort By - {this.state.sortSelected} </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={e => this.changeSortSelected('None', e)}>None</DropdownItem>
                <DropdownItem onClick={e => this.changeSortSelected('A-Z', e)}>Ascending A-Z</DropdownItem>
                <DropdownItem onClick={e => this.changeSortSelected('Lowest Price', e)}> Price (Low-High)</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

          </ButtonGroup>

          <hr />
          <div className="row">
            {products}
          </div>
          <Toast
            style={{
              position: 'absolute',
              top: 0,
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
          <hr />
        </div>
      </FadeTransform>
    );
  }
}

export default Products;