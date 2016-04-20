import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


export default class Delete extends Component {

    constructor(props) {
      super(props);
      this.state = {modalIsOpen: false};
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
      this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
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

      handleDeleteClicked(e) {
        e.preventDefault();
        // console.log(this.props.selectedElement);
        // this.props.onDelete(this.props.selectedElement);
        this.handleModalCloseRequest();
     }

    render() {
      return (
        <div className="mybtn">
       <button type="button" className="btn btn-danger" onClick={this.openModal}> <span className="glyphicon glyphicon-trash"></span> Delete </button>
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
                <h4 className="modal-title">Delete Element</h4>
              </div>
              <div className="modal-body">
                {/*<h4>Are you sure want to delete book with title: {this.props.selectedElement.title} </h4>*/}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.handleDeleteClicked}>Delete</button>
              </div>
            </div>
          </Modal>
        </div>
      );
  }
}
