import React from "react"
import PropTypes from "prop-types"
import {Container, Row, Col} from 'react-bootstrap';

import Board from './BoggleComponent/boggle';


class HelloWorld extends React.Component {
  render () {
    return (
      <React.Fragment>
        <p>Greetings: {this.props.greeting}</p>
        <Container>
          <Board/>
        </Container>
        
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
