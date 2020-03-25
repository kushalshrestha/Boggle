import React from "react"
import PropTypes from "prop-types"
import {Container, Row, Col} from 'react-bootstrap';

import Board from './BoggleComponent/boggle';
import Navigation from './BoggleComponent/NavComponent/navigation';


class HelloWorld extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Navigation></Navigation>
        <p>Greetings: {this.props.greeting}</p>
        </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
