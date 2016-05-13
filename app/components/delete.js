import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import deleteAction  from '../actions/delete';


class Delete extends Component {

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
        deleteAction(this.props.activeBook._links.self.href);
        this.handleModalCloseRequest();
     }

     deleteBody() {
       if (this.props.activeBook.length == 0){
         return(
           <div>
          <div className="modal-body">
            <h4>Please select an element </h4>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Close</button>
          </div>
          </div>
         )
     } else {
       return (
          <div>
         <div className="modal-body">
           <h4>Are you sure want to delete book with title: {this.props.activeBook.title} </h4>
         </div>
         <div className="modal-footer">
           <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Close</button>
           <button type="button" className="btn btn-primary" onClick={this.handleDeleteClicked}>Delete</button>
         </div>
         </div>
       )
      }
     }

    render() {
      return (
        <div className="mybtn">
       <button type="button" className="btn btn-danger" onClick={this.openModal}> <span className="glyphicon glyphicon-trash"></span> Delete </button>
          <Modal
            className="Modal__Bootstrap modal-dialog"
            closeTimeoutMS={150}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.handleModalCloseRequest}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                  <span aria-hidden="true">&times;</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title">Delete Element</h4>
              </div>
              {this.deleteBody()}
            </div>
          </Modal>
        </div>
      );
  }
}

function mapStateToProps({ activeBook }) {
  return { activeBook };
}

export default connect(mapStateToProps)(Delete);
