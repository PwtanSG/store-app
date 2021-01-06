// component to render shopping cart items. 

import React, { Component } from 'react';
import { Row, Col, Media, UncontrolledTooltip, Badge, Breadcrumb, BreadcrumbItem, ButtonGroup, Button, Form, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components'

class ShopCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cartTotalPrice: this.calculateTotal(),
            isUserAuthenticated: this.checkIsUserLogin(),
            shopCartArr: this.getCartArray(),
            cartGst: 7,
            cartDelivery: 3.00,
            redirect: false,
            checkout: false,
            deliveryDetails: false,
            payment: false

        };
    }

    paymentBtnHandler = () => {
        //this.setState({ deliveryDetails: true })
        setTimeout(() => { this.setState({ payment: true }); }, 500);
        console.log('payment clicked ')
    }

    deliveryDetailsBtnHandler = () => {
        //this.setState({ deliveryDetails: true })
        setTimeout(() => { this.setState({ deliveryDetails: true }); }, 500);
        console.log('confirmeddelivery clicked ')
    }

    checkoutBtnHandler = () => {
        //setTimeout(myFunction, 3000)
        setTimeout(() => { this.setState({ checkout: true }); }, 500);
        //this.setState({ checkout: true })
        console.log('checkout clicked ')
    }

    redirectHandler = () => {
        this.setState({ redirect: true })
        this.renderRedirect();
        console.log('click')
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            console.log("redirect handler")
            return <Redirect to='/products' />
        }
    }

    componentDidMount() {

    }

    checkIsUserLogin() {
        const currentUser = sessionStorage.getItem('user');
        console.log(currentUser);
        if (currentUser == null) {
            return false;
        } else {
            return true;
        }
    }

    getCartArray = () => {
        var cartArr = [];
        var cart = localStorage.getItem('cart');                    //get cart items from storage       
        if (cart == null) {                                         //if no existing cart items
            console.log("there is no localstorage cart");
            return cartArr;
        } else {                                                    //if no existing cart items
            console.log("Getting exist localstorage cart");
            cartArr = JSON.parse(cart);
            return cartArr
        }
    }

    updateCheckOut = (evt) => {
        evt.preventDefault();

    }

    upCartItemQty = (id, evt) => {
        evt.preventDefault();

        //console.log(this.state.shopCartArr)
        var cartArr = [];
        var cart = localStorage.getItem('cart');                    //get cart items from storage       
        if (cart != null) {                                         //if no existing cart items
            cartArr = JSON.parse(cart);                             //covert string from storage to obj
            cartArr.forEach((item, index) => {
                if (item.id === id) {
                    cartArr[index].qty = this.state.shopCartArr[index].qty + 1
                }
            });
            localStorage.setItem('cart', JSON.stringify(cartArr));  //convert obj to string update storage
            this.setState({ cartTotalPrice: this.calculateTotal() });
        }
        this.setState({ shopCartArr: this.getCartArray() });        //update state
    }


    downCartItemQty = (id, evt) => {
        evt.preventDefault();
        if (parseInt(document.getElementById(id).innerHTML) > 1) {
            var cartArr = [];
            var cart = localStorage.getItem('cart');                    //get cart items from storage       
            if (cart == null) {                                         //if no existing cart items
                console.log("there is no localstorage cart");
            } else {                                                    //if no existing cart items
                cartArr = JSON.parse(cart);                             //covert string from storage to obj
                cartArr.forEach((item, index) => {
                    if (item.id === id) {
                        cartArr[index].qty = this.state.shopCartArr[index].qty - 1;
                    }
                });
                localStorage.setItem('cart', JSON.stringify(cartArr));    //convert obj to string update storage
                this.setState({ cartTotalPrice: this.calculateTotal() });
            }
            this.setState({ shopCartArr: this.getCartArray() });         //update state
        }
    }

    calculateTotal = () => {
        var cartArr = [];
        var cart = localStorage.getItem('cart');                    //get cart items from storage   
        var totalprice = 0.00;
        if (cart != null) {                                         //if no existing cart items
            cartArr = JSON.parse(cart);                             //covert string from storage to obj
            cartArr.forEach((item, index) => {
                totalprice += parseFloat(item.price) * parseInt(item.qty);
            });
            totalprice = (totalprice).toFixed(2);                    //fix at 2 decimal point
        }

        //determine delivery charges
        (totalprice > 20) ?
            this.setState({ cartDelivery: 0 })
            : this.setState({ cartDelivery: 3 });

        return totalprice;
    }



    render() {

        let shopCartProps = this.props.shoppingcartitems;
        if (shopCartProps) {
            //const shopCartItems = this.props.shoppingcartitems.map((shopCartitem) => {
            const shopCartItems = this.state.shopCartArr.map((shopCartitem) => {
                const subTotal = (shopCartitem.price * shopCartitem.qty).toFixed(2);

                const renderUpdateQtyBtn = () => {
                    if (this.state.checkout) {
                        return <ButtonGroup>
                            <Button outline color="light" disabled>+</Button>
                            <Button outline color="light" disabled>-</Button>
                        </ButtonGroup>
                    } else {
                        return <ButtonGroup>
                            <Button outline color="primary" onClick={e => this.upCartItemQty(`${shopCartitem.id}`, e)}>+</Button>
                            <Button outline color="primary" onClick={e => this.downCartItemQty(`${shopCartitem.id}`, e)}>-</Button>
                        </ButtonGroup>
                    }
                }
                return (
                    <React.Fragment>
                        <Row key={shopCartitem.id}>
                            <Col>
                                <Link to={`/products/${shopCartitem.id}`}>
                                    <strong>{shopCartitem.name}</strong><br />
                                    <Media object src={shopCartitem.image} alt={shopCartitem.name} />
                                </Link>
                            </Col>
                            <Col>${shopCartitem.price} {shopCartitem.unit}</Col>
                            <Col>
                                Qty: <span id={shopCartitem.id}>{shopCartitem.qty}</span><span>&nbsp;&nbsp;</span>
                                {renderUpdateQtyBtn()}
                                <span>&nbsp;${subTotal}</span>

                            </Col>
                        </Row>
                        <hr />
                    </React.Fragment>

                );
            });

            const gstAmount = ((this.state.cartTotalPrice / 100) * parseFloat(this.state.cartGst)).toFixed(2);
            const totalPayment = (parseFloat(this.state.cartTotalPrice) + parseFloat(this.state.cartDelivery)).toFixed(2);
            const renderCartBtn = () => {
                if (this.state.checkout && !this.state.deliveryDetails) {
                    return <div id="cartTotalBtn">
                        <Button color="secondary" size="sm" block disabled>1. Checkout</Button>
                        <strong>Delivery Details</strong>
                        <Form onSubmit={this.handleSubmit}>
                            <Input type="text" id="rxName" name="rxName"
                                placeholder="Receiver name"
                                value="John Tan" />
                            <Input type="text" id="rxContact" name="rxContact"
                                placeholder="Contact no."
                                value="+65 87654321" />
                            <Input type="text" id="delAddress" name="delAddress"
                                placeholder="Delivery Address"
                                value="Blk 111, Dover Rd #99-09 S232311" />
                        </Form>
                        <Button color="warning" size="sm" onClick={this.deliveryDetailsBtnHandler} block>2. Confirm Delivery Details</Button><br />
                    </div>

                } else {
                    if (this.state.checkout && this.state.deliveryDetails && !this.state.payment) {
                        return <div id="cartTotalBtn">
                            <Button color="secondary" size="sm" block disabled>1. Checkout</Button>
                            <strong>Delivery Details</strong>
                            <div>Delivery to : John Tan</div>
                            <div>Contact no. : +65 87654321</div>
                            <div>Delivery Address. : Blk 111, Dover Rd #99-09 S232311</div>
                            <Button color="secondary" size="sm" block disabled>2. Delivery Details</Button>
                            <strong>Payment Details</strong>
                            <Form onSubmit={this.handleSubmit}>
                                <Input type="text" id="rxName" name="rxName"
                                    placeholder="Credit Card Name"
                                    value="John Tan" />
                                <Input type="text" id="rxContact" name="rxContact"
                                    placeholder="Credit Card No."
                                    value="4265 4321 5432 6543" />
                                <Input type="text" id="delAddress" name="delAddress"
                                    placeholder="CVC"
                                />
                            </Form>
                            <Button color="warning" size="sm" onClick={this.paymentBtnHandler} block>3. Make Payment</Button><br />
                        </div>
                    }
                    else {
                        if (this.state.checkout && this.state.deliveryDetails && this.state.payment) {
                            localStorage.removeItem('cart');
                            return <div id="cartTotalBtn">
                                <Button color="secondary" size="sm" block disabled>1. Checkout</Button>
                                <strong>Delivery Details</strong>
                                <div>Deliver to : John Tan</div>
                                <div>Contact no. : +65 87654321</div>
                                <div>Delivery Address. : Blk 111, Dover Rd #99-09 S232311</div>
                                <Button color="secondary" size="sm" block disabled>2. Delivery Details</Button>
                                <strong>Payment Details</strong>
                                <div>Charge to : John Tan</div>
                                <div>Card no. : 4265 4321 5432 6543</div>
                                <Button color="warning" size="sm" block disabled>3. Payment made</Button><br />
                                <strong>Order confirmed</strong>
                                <div>Order ID: 0001099</div>
                                <Button color="primary" size="sm" onClick={this.redirectHandler} block>Continue shopping</Button>{this.renderRedirect()}<br />
                            </div>
                        }
                        else {
                            return <div id="cartTotalBtn"><Button color="success" size="sm" onClick={this.checkoutBtnHandler} block>Proceed Checkout</Button>
                                <Button color="primary" size="sm" onClick={this.redirectHandler} block>Continue shopping</Button><br />{this.renderRedirect()}</div>
                        }
                    }
                }
            }


            return (
                <FadeTransform in
                    transformProps={{ exitTransform: 'scale(1.0) translateY(10%)' }}>
                    <div className="container">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/products'>Product</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Shopping Cart</BreadcrumbItem>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col xs="12" md="9">
                                <div>
                                    <h4>Shopping Cart {" "}
                                        <Button outline color="link" disabled><span className="fa fa-shopping-cart fa-lg"></span>
                                            {" "}<Badge color="dark">{this.state.shopCartArr.length}</Badge></Button>
                                    </h4>
                                    <hr />
                                    {shopCartItems}
                                </div> <br />
                            </Col>
                            <Col xs="12" md="3">
                                <div className="container" id="cartTotal">
                                    <div>Sub Total : $ {this.state.cartTotalPrice}</div>
                                    <div>Include GST ({this.state.cartGst}%) : ${gstAmount} </div>
                                    <div>Delivery charges <span href="#" id="TooltipDeliveryCharge" class="fa fa-info-circle">: ${this.state.cartDelivery.toFixed(2)}</span><br />
                                        <UncontrolledTooltip placement="top" target="TooltipDeliveryCharge">
                                            Free delivery for purchase above $20!
                                </UncontrolledTooltip>
                                    </div>
                                    <strong>Total Payment : $ {totalPayment}</strong>
                                    {renderCartBtn()}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </FadeTransform>
            );
        } else { //if there is nothing in cart
            return (
                <FadeTransform in
                    transformProps={{ exitTransform: 'scale(0.5) translateY(10%)' }}>
                    <div className="container">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/products'>Product</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Shopping Cart</BreadcrumbItem>
                        </Breadcrumb>
                        <hr />
                        <div className="col-12 col-md-6">
                            <h4>Shopping Cart {" "}<Button outline color="link"><span className="fa fa-shopping-cart fa-lg"></span>
                                {" "}<Badge color="dark">0</Badge></Button></h4>
                        Your have no item in the cart.<br /><br />
                            <Link to='/products'><strong><p id="shop">Start Shopping now!</p></strong></Link>
                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </div>

                        <hr></hr>
                    </div>
                </FadeTransform>
            );
        }

    }


}

export default ShopCart;