/* eslint max-len: 0 */
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import 'toastr/build/toastr.min.css';
import '../../css/react-bootstrap-table.css';
import {
  Navbar,
  NavBrand,
  Nav,
  NavItem,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

class Application extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar inverse toggleNavKey={ 0 }>
          <NavBrand><a href='#'>derBibliothek</a></NavBrand>
          <Nav>
            <LinkContainer to='/students'>
              <NavItem>Ученици</NavItem>
            </LinkContainer>
            <LinkContainer to='/books'>
              <NavItem>Книги</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        <Grid fluid>
          <Row>
            <Col md={ 12 }>
              { this.props.children }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Application;
