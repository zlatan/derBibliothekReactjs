import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';


class Read extends Component {

  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
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

    loadData(){
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
      <h4>Visualization</h4>
          <form className="form-horizontal">
          <div className="form-group">
          <label for="inputEmail3" className="col-sm-2 control-label">price</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.price}</h4>
          </div>
          <label for="inputEmail3" className="col-sm-2 control-label">signature</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.signature}</h4>
          </div>
          <label for="inputEmail3" className="col-sm-2 control-label">title</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.title}</h4></div>
          <label for="inputEmail3" className="col-sm-2 control-label">author</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.author}</h4></div>
          <label for="inputEmail3" className="col-sm-2 control-label">volume</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.volume}</h4></div>
          <label for="inputEmail3" className="col-sm-2 control-label">year</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.yearPublishing}</h4></div>
          <label for="inputEmail3" className="col-sm-2 control-label">deduction</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.deduction} </h4></div>
          <label for="inputEmail3" className="col-sm-2 control-label">barCode</label>
          <div className="col-sm-10">
          <h4>{this.props.activeBook.barCode}</h4></div>
          </div>
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Close</button>
      </div>
    </div>
      )
      }
    }

  render() {
    return (
      <div className="mybtn">
      <button type="button" className="btn btn-info btn-primary" onClick={this.openModal}> <span className="glyphicon glyphicon-eye-open"></span>Read</button>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleModalCloseRequest}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modal title</h4>
            </div>
            {this.loadData()}
          </div>
        </Modal>
      </div>
    );
  }

}

function mapStateToProps({ activeBook }) {
  return { activeBook };
}

export default connect(mapStateToProps)(Read);
