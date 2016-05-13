import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import createAction  from '../actions/create';


export default class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
    }

    openModal() {
     this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    handleModalCloseRequest() {
      this.setState({modalIsOpen: false});
    }

    handleSaveClicked(e) {
      e.preventDefault();
      var newBook = {};
      var atributes = ["title", "author", "volume", "yearPublishing", "price" , "signature", "deduction", "barCode"];
      atributes.map( element => {
        newBook[element] = ( ReactDOM.findDOMNode(this.refs[element]).value.trim() );
      });
      createAction(newBook);
      //console.log(newBook);
      this.handleModalCloseRequest();
   }

  render() {
    return (
      <div className="mybtn">
        <button type="button" className="btn btn-success btn-primary" onClick={this.openModal}> <span className="glyphicon glyphicon-plus"></span> Create</button>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Modal title</h4>
            </div>
            <div className="modal-body">
              <h4>Really long content...</h4>
              <form className="form-inline">
                <div className="form-group">
                <label for="exampleInputName2">price</label>
                <input type="text" className="form-control" id="exampleInputName2" placeholder="price" ref="price" />
                </div>
                <div className="form-group">
                <label for="exampleInputName2">signature</label>
                <input type="text" className="form-control" id="exampleInputName2" placeholder="signature" ref="signature"/>
                </div>
              </form>
              <form className="form-horizontal">
              <div className="form-group">
              <label for="inputEmail3" className="col-sm-2 control-label">title</label>
              <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="title" ref="title"/></div>
              <label for="inputEmail3" className="col-sm-2 control-label">author</label>
              <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="author" ref="author"/></div>
              <label for="inputEmail3" className="col-sm-2 control-label">volume</label>
              <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="volume" ref="volume"/></div>
              <label for="inputEmail3" className="col-sm-2 control-label">year</label>
              <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="yearPublishing" ref="yearPublishing"/></div>
              <label for="inputEmail3" className="col-sm-2 control-label">deduction</label>
              <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="deduction" ref="deduction"/></div>
              <label for="inputEmail3" className="col-sm-2 control-label">barCode</label>
              <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="barCode" ref="barCode"/></div>
              </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>Create</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
