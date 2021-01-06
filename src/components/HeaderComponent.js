import React, { Component } from 'react';
import {
  Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Media
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);

    //tracking nav, modal state, default close:false
    this.state = {
      isNavOpen: false,
      isLoginModalOpen: false,
      isLogoutModalOpen: false,
      isUserLogin: this.checkIsUserLogin(),
    };
    //bind methods in constructor
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleLogoutModal = this.toggleLogoutModal.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }

  //toggle nav open state when click
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  //toggle login open state when click
  toggleLoginModal() {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    });
  }

  //methods to get modal form inputs
  handleLogin(event) {
    this.toggleLoginModal();           //close login modal
    //alert("Username: " + this.username.value + " Password: " + this.password.value
    //  + " Remember: " + this.remember.checked);
    if ((this.username.value === 'spwmf') && (this.password.value === "password")) {
      sessionStorage.setItem('user', this.username.value);
    }
    this.setState({ isUserLogin: true });
    event.preventDefault();
  }

  loginLogoutNavIcon() {
    const currentUser = sessionStorage.getItem('user');
    if ((currentUser == null) && (!this.state.isUserLogin))
      return <Button outline color="light" onClick={this.toggleLoginModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>;
    else
      return <Button outline color="light" onClick={this.userLogout}><span className="fa fa-sign-out fa-lg"></span> Hi, {currentUser}</Button>;
  }

  cartNavLink() { //do not show cart if not login
    const currentUser = sessionStorage.getItem('user');
    if ((currentUser == null) && (!this.state.isUserLogin))
      return <NavItem><Button id="cart" outline color="link" onClick={this.toggleLoginModal}><span className="fa fa-shopping-cart fa-lg"></span> {" "}Cart</Button></NavItem>;
    else
      return <NavItem><NavLink className="nav-link" to="/cart"><span className="fa fa-shopping-cart fa-lg"></span>  Cart</NavLink></NavItem>;
  }

  checkIsUserLogin() {
    const currentUser = sessionStorage.getItem('user');
    if (currentUser == null) {
      return false;
    } else {
      return true;
    }
  }

  //toggle login open state when click
  toggleLogoutModal() {
    this.setState({
      isLogoutModalOpen: !this.state.isLogoutModalOpen
    });
  }

  userLogout() {
    //console.log(this.state.isUserLogin)
    this.setState({ isUserLogin: false });
    sessionStorage.removeItem('user')
  }

  render() {

    return (
      <React.Fragment>

        {/* Nav bar */}
        <Navbar dark color="primary" expand="lg">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand href="/"><Media object src="/store-app/images/co-logo-trans.png" alt="daily grocery" />Daily Grocery</NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/about">
                    <span className="fa fa-info fa-lg"></span> About us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/products">
                    <span className="fa fa-list fa-lg"></span> Products
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contact">
                    <span className="fa fa-address-card fa-lg"></span> Contact us
                  </NavLink>
                </NavItem>
                {this.cartNavLink()}
              </Nav>
              {/* Nav bar - login */}
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {this.loginLogoutNavIcon()}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        {/* Modal login form*/}
        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
          <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username" required
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" required
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember"
                    innerRef={(input) => this.remember = input} />
                                    Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>


        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;