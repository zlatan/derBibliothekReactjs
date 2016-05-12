import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';


class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
    this.handleUpdateClicked = this.handleUpdateClicked.bind(this);
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
      <h4>Update ...</h4>
          <form className="form-horizontal">
          <div className="form-group">
          <label for="inputEmail3" className="col-sm-2 control-label">price</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="price" defaultValue={this.props.activeBook.price} ref="price"/></div>
          <label for="inputEmail3" className="col-sm-2 control-label">signature</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="signature" defaultValue={this.props.activeBook.signature} ref="signature"/></div>
          <label for="inputEmail3" className="col-sm-2 control-label">title</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="title" defaultValue={this.props.activeBook.title} ref="title"/></div>
          <label for="inputEmail3" className="col-sm-2 control-label">author</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="author" defaultValue={this.props.activeBook.author} ref="author"/></div>
          <label for="inputEmail3" className="col-sm-2 control-label">volume</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="volume" defaultValue={this.props.activeBook.volume} ref="volume"/></div>
          <label for="inputEmail3" className="col-sm-2 control-label">year</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="yearPublishing" defaultValue={this.props.activeBook.yearPublishing} ref="yearPublishing"/></div>
          <label for="inputEmail3" className="col-sm-2 control-label">deduction</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="deduction" defaultValue={this.props.activeBook.deduction} ref="deduction"/></div>
          <label for="inputEmail3" className="col-sm-2 control-label">barCode</label>
          <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="barCode" defaultValue={this.props.activeBook.barCode} ref="barCode"/></div>
          </div>
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Close</button>
        <button type="button" className="btn btn-primary" onClick={this.handleUpdateClicked}>Update</button>
      </div>
    </div>
      )
      }
    }

    handleUpdateClicked(e) {
      e.preventDefault();
      var updateBook = {};
      var atributes = ["title", "author", "volume", "yearPublishing", "price" , "signature", "deduction", "barCode"];
      atributes.map( element => {
        updateBook[element] = ( ReactDOM.findDOMNode(this.refs[element]).value.trim() );
      });
      updateBook['price'] = parseFloat(updateBook['price']);
      console.log(updateBook);
      console.log(this.props.activeBook);
      //this.props.onUpdate(this.props.selectedElement, updateBook);
      this.handleModalCloseRequest();
   }

  render() {
    return (
      <div className="mybtn">
      <button type="button" className="btn btn-warning" onClick={this.openModal}> <span className="glyphicon glyphicon-pencil"></span> Update</button>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleModalCloseRequest}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.handleUpdateClicked}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
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

export default connect(mapStateToProps)(Update);
