/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Col, Panel } from 'react-bootstrap';


const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(5);

export default class Students extends React.Component {
  render() {
    return (
      <Col md={ 10 } mdOffset={ 1 }>
        <Panel header={ 'Списък с всички ученици' }>
            <BootstrapTable data={ products }>
                <TableHeaderColumn dataField='id' isKey={ true }>Номер</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
            </BootstrapTable>
      </Panel>
    </Col>
    );
  }
}


export default Students;
