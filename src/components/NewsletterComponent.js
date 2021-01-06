import React from 'react';
import { Form, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

class NewsletterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            subscription: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    isEmailValid = (testemail) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(testemail);
    }

    handleInputChange = (event) => {
        this.setState({ email: event.target.value });
        //alert(event.target.value)
        if (event.target.value.length > 0){
            document.querySelector("#submit").disabled = false;
        }else{
            document.querySelector("#submit").disabled = true;
            document.getElementById("error").innerHTML = '';
        }
    
    }

    handleSubmit = (event) => {
        event.preventDefault();                                 //prevent to goto next page after submit
        if (this.state.email.length > 0) {
            if(!this.isEmailValid(this.state.email)){
                document.getElementById("error").innerHTML = ' Invalid email.';
            }else{
                document.getElementById("error").innerHTML = '';
                setTimeout(() => {
                    document.getElementById("subemail").value = '';
                    document.getElementById("submit").style.background='#000000';
                    document.getElementById("btnText").innerHTML='OK ' + '<i class="fa fa-check" aria-hidden="true"></i>';
                }, 500); 

                setTimeout(() => {
                    document.getElementById("btnText").innerHTML='<i class="fa fa-paper-plane" aria-hidden="true"></i>';
                    document.querySelector("#submit").disabled = true;
                }, 2000);
            }

            
        } else {
            document.getElementById("error").innerHTML = ' Please enter email.';
        }
    }

    componentDidMount(){
        document.querySelector("#submit").disabled = true;
    }
 

    render() {
        return (
            <React.Fragment>
                <small>Subcribe now!<span id="error"></span><span id="success"></span></small>
               
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup size="sm">
                        <Input type="text" id="subemail" name="subemail"
                            placeholder="Type your email..."
                            onChange={this.handleInputChange} />
                        <InputGroupAddon addonType="prepend">
                            <Button id="submit" color="dark">
                                <span id="btnText"><i className="fa fa-paper-plane" aria-hidden="true"></i></span>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            </React.Fragment>
        );
    }
}
export default NewsletterForm;