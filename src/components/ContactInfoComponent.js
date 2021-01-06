import React from 'react';
import StoreMap from './StoreMapComponent';

const ContactInfo = () => {

    return (
        <div className="row row-content">
            <div className="col-12">
                <h3>Head Office</h3>
            </div>
            <div className="col-12 col-sm-3 offset-sm-0">
                <h4>Our Address <i class="fa fa-map-marker"></i></h4>
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
                <h4>Map Location</h4>
                <StoreMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5ZR18f8Ykrur5av4bFEVNrjBj-kTa-r4&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <br/>
            </div>

            <div className="col-12">
                <h3>Contact Information <i class="fa fa-address-card"></i></h3><br/>
            </div>
            <div className="col-12 col-sm-12 offset-sm-0">
                <h5>General Enquiry</h5>
                <p>Tel: 6509 2788
                Monday - Sunday, 9am to 9pm
                (including Public Holidays)
                generalenquiry@dailygrocery.com</p>
                <div className="btn-group" role="group">
                    <a role="button" className="btn btn-primary" href="tel:+6587654321"><i className="fa fa-phone"></i> Call</a>
                    <a role="button" className="btn btn-success" href="mailto:generalenquiry@dailygrocery.com"><i className="fa fa-envelope-o"></i> Email</a>
                </div><br/>
            </div>
            <div className="col-12 col-sm-12 offset-sm-0">
            <br/>
                <h5>Online Order Enquiry Feedback</h5>
                <p>Tel: 6519 2788
                Monday - Sunday, 9am to 9pm
                (including Public Holidays)
                onlineenquiry@dailygrocery.com</p>
                <div className="btn-group" role="group">
                    <a role="button" className="btn btn-primary" href="tel:+6587654321"><i className="fa fa-phone"></i> Call</a>
                    <a role="button" className="btn btn-success" href="mailto:onlineenquiry@dailygrocery.com"><i className="fa fa-envelope-o"></i> Email</a>
                </div>
            </div>
            <div className="col-12 col-sm-12 offset-sm-0">
            <br/>
                <h5>Corporate and Bulk Enquiries</h5>
                <p>Tel: 6529 2788
                Monday - Sunday, 9am to 9pm
                (including Public Holidays)
                corpenquiry@dailygrocery.com</p>
                <div className="btn-group" role="group">
                    <a role="button" className="btn btn-primary" href="tel:+6587654321"><i className="fa fa-phone"></i> Call</a>
                    <a role="button" className="btn btn-success" href="mailto:corpenquiry@dailygrocery.com"><i className="fa fa-envelope-o"></i> Email</a>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;