import React from 'react';
import { Button } from 'reactstrap';
import Toast from "react-bootstrap/Toast";

function ToastSuccess(props) {

    const [show, setShow] = React.useState(true);

    return (
        <div className="container">

            <Toast
                color="success"
                style={{
                    color: '#ffffff',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: '#5cb85c',
                }}
                show={show} onClose={() => setShow(false)} delay={3000} autohide>


                <Toast.Body>
                    <span className="fa fa-check" aria-hidden="true"></span> Error Item added to cart succesfully.
                </Toast.Body>
            </Toast>
        </div>
    );
}

export default ToastSuccess;