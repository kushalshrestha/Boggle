import React from "react";
import './timer.css';
import {Container, Row, Col,Button, Alert,ButtonToolbar, ButtonGroup, Card} from "react-bootstrap";

export default class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>Want to play again?</h1>
            <Button variant="primary" className="cus-btn" onClick={() => window.location.reload(false)}>Yes</Button>
            <p>Stay safe. Stay at home. Enjoy playing !!! #covid-19</p>
          </div>
        </div>
      );
    }
  }