import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterComponent';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-0 col-md-2 col-lg-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/about'>About us</Link></li>
                        <li><Link to='/products'>Products</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
                </div>
                <div className="col-7 col-md-3 col-lg-3">
                    <h5>Our Address</h5>
                    <address>
		              111, Sommerset Road<br />
		              Triple One Tower<br />
		              Singapore 111333<br />
		              <i className="fa fa-phone fa-lg"></i>: +65 6534 5678<br />
		              <i className="fa fa-fax fa-lg"></i>: +65 8765 4321<br />
		              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:cs@dailygrocery.com">
                      cs@dailygrocery.com</a>
                    </address>
                </div>

                <div className="col-11 col-md-4 col-lg-3">
                    <h5>Newsletter</h5>
                    <NewsletterForm />
                </div>

                <div className="col-12 col-md-12 col-lg-3">
                    <div className="text-center">
                        <h5>Follow Us</h5>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2020 Daily Grocery</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;