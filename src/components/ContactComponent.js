//component to handle feedback form

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import ContactInfo from './ContactInfoComponent';
import { Tabs, Tab } from 'react-bootstrap'
import { FadeTransform } from 'react-animation-components'

class Contact extends Component {

    constructor(props) {
        super(props);

        //states to track form fields
        this.state = {
            firstname: "",
            lastname: "",
            telnum: "",
            email: "",
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {	//object to track field was touched = true
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            },
        }

        //bind methods in contructor
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.validate = this.validate.bind(this);
    }

    //method to handle form input. event provide the fields info
    handleInputChange(event) {

        const target = event.target;
        console.log(target.checked)
        //if form type === checkbox then value=target.checked else(for other form type) value=tartget.value
        //if it's a checkbox event, return the checkbox status from .checked
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log("name:" + target.name)
        console.log("type:" + target.type)
        console.log("value:" + target.value)
        console.log("check:" + target.checked)

        //update form with the user input through setState, change in states will show user input
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    //method handle form submission
    handleSubmit(event) {
        console.log("event")
        if (this.state.firstname && this.state.lastname && this.state.telnum && this.state.email) {
            console.log('Current State is: ' + JSON.stringify(this.state));
            alert('Current State is: ' + JSON.stringify(this.state));
        }

        event.preventDefault();				//prevent go to next page

    }

    //to detect user 'touches' the field before by onBlur()
    handleOnKeyUp = (field) => (evt) => {
        //set the field to true if the field was touched
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });

    }

    //method to validate the form each time is rendered
    validate(firstname, lastname, telnum, email) {
        //validatation error msg object, start default empty string
        const errors = {
            firstname: "",
            lastname: "",
            telnum: "",
            email: "",
        };

        //validatation error msg object, for reactstrap formfeedback to display 
        if (this.state.touched.firstname && firstname.length < 3) {

            errors.firstname = 'Min 3 characters';
            if (firstname.length === 0) errors.firstname = 'First Name is required';
        } else {
            if (this.state.touched.firstname && firstname.length > 20) {
                errors.firstname = 'Max 20 characters';
            }
        }


        if (this.state.touched.lastname && lastname.length < 3) {
            errors.lastname = 'Min 3 characters';
            if (lastname.length === 0) errors.lastname = 'Last Name is requried';
        } else {
            if (this.state.touched.lastname && lastname.length > 20) {
                errors.lastname = 'Max 20 characters';
            }
        }

        const reg = /^\d+$/;
        if (this.state.touched.telnum && !reg.test(telnum)) {
            errors.telnum = 'Contact no. should contain only digit';
            if (telnum.toString().length === 0) errors.telnum = 'Contact no. is required';
        } else {
            if (this.state.touched.telnum && telnum.toString().length > 12) {
                errors.telnum = 'Max 12 digits';
            }
        }


        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.touched.email && !re.test(email)) {
            errors.email = 'Invalid email';
            if (email.length === 0) errors.email = 'Email is required';
        }


        return errors;
    }


    mandatory(statefirstname, statelastname, statetelnum, stateemail) {
        //validatation error msg object, start default empty string

        const mandatoryField = {
            firstname: statefirstname,
            lastname: statelastname,
            telnum: statetelnum,
            email: stateemail,
        };

        var flag = true;
        for (const [key, value] of Object.entries(mandatoryField)) {
            if (value === '') flag = false;
        }
        return flag;
    }

    componentDidMount() {
        document.querySelector("#submit").disabled = true;
    }

    render() {
        {/*invoke form validation every time form rendered */ }
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        var errflag = false;
        for (const [key, value] of Object.entries(errors)) {
            if (value !== '') errflag = true;
        }
        //console.log("ErrorFlag:" + errflag)

        const mandatoryFields = this.mandatory(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        //console.log("all mandate:" + mandatoryFields)

        if (!errflag && mandatoryFields) {
            document.querySelector("#submit").disabled = false;
        } else {
            document.querySelector("#submit").disabled = true;
        }


        return (
            <FadeTransform in
            transformProps={{ exitTransform: 'scale(1.0) translateY(10%)'}}>
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h4>Contact Us</h4>
                        <hr />
                    </div>
                </div>
                <Tabs defaultActiveKey="contact" id="uncontrolled-tab-example">
                    <Tab eventKey="contact" title="Contact">
                        <ContactInfo />
                    </Tab>
                    <Tab eventKey="feedback" title="Feedback">
                        {/*forms for user feedback*/}
                        <div className="row row-content">
                            <div className="col-12">
                                <h3> Send us your Feedback <i class="fa fa-comments fa-lg"></i> </h3>
                                We care about your shopping experience.
                                Let us know how we can help you.<br/><br/>
                            </div>
                            <div className="col-12 col-md-9">

                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="firstname" md={2}>First Name *</Label>
                                        <Col md={10}>
                                            <Input type="text" id="firstname" name="firstname"
                                                placeholder="First Name"
                                                value={this.state.firstname}
                                                valid={errors.firstname === ''}
                                                invalid={errors.firstname !== ''}
                                                onKeyUp={this.handleOnKeyUp('firstname')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.firstname}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="lastname" md={2}>Last Name *</Label>
                                        <Col md={10}>
                                            <Input type="text" id="lastname" name="lastname"
                                                placeholder="Last Name"
                                                value={this.state.lastname}
                                                valid={errors.lastname === ''}
                                                invalid={errors.lastname !== ''}
                                                onKeyUp={this.handleOnKeyUp('lastname')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.lastname}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="telnum" md={2}>Contact no. *</Label>
                                        <Col md={10}>
                                            <Input type="tel" id="telnum" name="telnum"
                                                placeholder="Contact no."
                                                value={this.state.telnum}
                                                valid={errors.telnum === ''}
                                                invalid={errors.telnum !== ''}
                                                onKeyUp={this.handleOnKeyUp('telnum')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.telnum}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="email" md={2}>Email *</Label>
                                        <Col md={10}>
                                            <Input type="email" id="email" name="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                valid={errors.email === ''}
                                                invalid={errors.email !== ''}
                                                onKeyUp={this.handleOnKeyUp('email')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.email}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{ size: 6, offset: 2 }}>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="checkbox"
                                                        name="agree"
                                                        checked={this.state.agree}
                                                        onChange={this.handleInputChange} /> {' '}
                                            May we contact you?
                                        </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={{ size: 3, offset: 1 }}>
                                            <Input type="select" name="contactType"
                                                value={this.state.contactType}
                                                onChange={this.handleInputChange}>
                                                <option>Phone</option>
                                                <option>SMS</option>
                                                <option>Email</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="message" md={2}>Your Feedback</Label>
                                        <Col md={10}>
                                            <Input type="textarea" id="message" name="message"
                                                rows="12"
                                                value={this.state.message}
                                                onChange={this.handleInputChange}></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 2 }}>
                                            <Button type="submit" id="submit" color="primary">
                                                Send Feedback
                                    </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </Tab>
                </Tabs>


            </div>
            </FadeTransform>
        );
    }

}

export default Contact;