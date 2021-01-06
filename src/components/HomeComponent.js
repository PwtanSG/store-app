import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import Carouselcom from './CarouselComponent';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item }) {
    //console.log(item)

    // determine label color
    let labelColor = '';
    (item.label === 'Featured') ? labelColor = 'warning'
        : (item.label === 'New') ? labelColor = 'info'
            : (item.label === 'Hot') ? labelColor = 'danger'
                : (item.label === 'Offer') ? labelColor = 'success'
                    : labelColor = 'dark';


    return (

        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name} <Badge color={labelColor}>{item.label}</Badge></CardTitle>
                <CardText>${item.price} {item.unit}</CardText>
                <CardText>{item.description}</CardText>
                <Link to={`/products/${item.id}`}>
                <CardText><small>View Details</small></CardText>
                </Link>
            </CardBody>

        </Card>

    );
}



function Home(props) {
    
    const items = [
        {
            src: '/store-app/images/grocery6.png',
            altText: 'Shop with us now!',
            caption: 'Wide variety of grocery items available. '
        },
        {
            src: '/store-app/images/grocery2.png',
            altText: 'Freshness guaranteed',
            caption: 'We take great pride in the quality of our products.'
        },
        {
            src: '/store-app/images/freedelivery.png',
            altText: 'Delivery to your doorstep',
            caption: 'Free delivery for purchase above $20!'
        },
        {
            src: '/store-app/images/store.png',
            altText: 'Shop at our stores',
            caption: 'Shop at our convieniently located stores.'
        },
        {
            src: '/store-app/images/online.png',
            altText: 'Order through our mobile app',
            caption: 'No more queuing at checkout cashier. Order using our mobile app now.'
        }
    ];

    return (        
        <FadeTransform in
                    transformProps={{ exitTransform: 'scale(1.0) translateX(-10%)' }}>

        <div className="container">
            <hr />
            <div className="row align-items-start">
                <div className="col-12 col-md-4 col-lg-6 m-0">
                    <Carouselcom citems={items} />
                </div>
                <div className="col-12 col-md-4 col-lg-3 m-0">
                    <RenderCard item={props.productOffer} />
                </div>
                <div className="col-12 col-md-4 col-lg-3 m-0">
                    <RenderCard item={props.productNew} />
                </div>
            </div>
            <hr />
        </div>
        </FadeTransform>

    );
}

export default Home;