import React from 'react';
import StoreMap from './StoreMapComponent';


const StoreLocation = () => {

    return (
        <div className="row row-content">
            <div className="col-12">
                <h3>Location Information <i class="fa fa-map-marker"></i></h3>
            </div>
            <div className="col-12 col-sm-5 offset-sm-0">
                <h5>Our Address</h5>
                <address>
                    500, Dover Road<br />
                            Tower A <br />
                            Singapore 139651<br />
                    <i className="fa fa-phone"></i>: +65 6543 5678<br />
                    <i className="fa fa-fax"></i>: +65 8765 4321<br />
                    <i className="fa fa-envelope"></i>: <a href="mailto:cs@dailygrocery.com">cs@dailygrocery.com</a>
                </address>
                <br/>
            </div>
            <div className="col-12 col-sm-6 offset-sm-0">
                <h5>Map of our Location</h5>
                <StoreMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-zNHnUc5GoPIHriflvM8mNxImltDtVsU&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <br/>
            </div>
            <div className="col-12 col-sm-11 offset-sm-1">
                <div className="btn-group" role="group">
                    <a role="button" className="btn btn-primary" href="tel:+6587654321"><i className="fa fa-phone"></i> Call</a>
                    <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                    <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                </div>
            </div>
        </div>
    );
}

export default StoreLocation;