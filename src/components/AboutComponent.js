import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';


const About = () => {
    return (
        <FadeTransform in
            transformProps={{ exitTransform: 'scale(1.0) translateY(10%)' }}>
            <div className="container">

                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About us</BreadcrumbItem>
                </Breadcrumb>
                <hr />
                <Row>
                    <Col sm="5" xs="12">
                        <img
                            alt="our first store"
                            className=" img-fluid rounded shadow"
                            src="/store-app/images/firststore1.png"
                        ></img>

                    </Col>
                    <Col sm="7" xs="12">
                        <br/>
                        <h4>About Us </h4>
                        Established in 1974, Daily Grocery started off as local mini-mart store in with just 500sqft. We now have 100 stores today.
                        Our retail stores are primarily located in the heartlands of Singapore. These include a wide assortment of live, fresh and chilled produce, such as seafood, meat,
                        fruits and vegetables.
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm="5" xs="12">
                        <img
                            alt="our mission"
                            className=" img-fluid rounded shadow"
                            src="/store-app/images/grocery5.png"
                        ></img>

                    </Col>
                    <Col sm="7" xs="12">
                        <br/>
                        <h4>Our Mission </h4>
                        To provide fresh products at reasonable prices with friendly service so as to achieve “Daily Fresh, Daily 
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm="5" xs="12">
                        <img
                            alt="our award"
                            className=" img-fluid rounded shadow"
                            src="/store-app/images/award.png"
                        ></img>

                    </Col>
                    <Col sm="7" xs="12">
                        <br/>
                        <h4>Our Awards </h4>
                        Our strong team and commitment to quality is recognised by industry. We are humbled to have been honoured with numerous corporate and brand awards over the years.
                    </Col>
                </Row>
                <hr />
            </div>
        </FadeTransform>
    );
};

export default About;