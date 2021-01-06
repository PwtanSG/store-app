import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Badge, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class ProductsByCat extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
      categorySelected: 'All',
      modcode: 'IT8905'
    };
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  
  changeCategorySelected(val, evt) {
    evt.preventDefault();                   //need to prevent evt error, if not cannot work
    this.setState({categorySelected: val});
  }

  render() {
    console.log(this.props.productsbycat)

    const products = this.props.productsbycat.map((product) => {
      return (
        <div className="col-12 col-sm-3">
          <Card key={product.id}>
            <Link to={`/products/${product.id}`}>
              <CardImgOverlay>
                <CardText><Badge color="secondary">{product.label}</Badge></CardText>
              </CardImgOverlay>
              <CardImg top src={product.image} alt={product.name} />
              <CardBody>
                <CardTitle>{product.name}</CardTitle>
                <CardText>${product.price}</CardText>
              </CardBody>
            </Link>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
          <BreadcrumbItem>Products</BreadcrumbItem>
          <BreadcrumbItem active>{this.state.categorySelected}</BreadcrumbItem>
        </Breadcrumb>
        <h4>Shop now {this.state.categorySelected}</h4>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle className="nav-link" caret> Categories - {this.state.categorySelected} </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link to='/home'>Home</Link></DropdownItem>
            <DropdownItem onClick={e=>this.changeCategorySelected('fruits',e)}>Fruits</DropdownItem>
            <DropdownItem onClick={e=>this.changeCategorySelected('Vegetables',e)}>Vegetables</DropdownItem>
            <DropdownItem>Poutry</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <hr></hr>
        <div className="row">
          {products}
        </div>
        <hr></hr>
      </div>

    );
  }
}

export default ProductsByCat;