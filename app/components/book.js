import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { selectBook } from '../actions/select_book';
import { bindActionCreators } from 'redux';


class Book extends Component{
	constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
		}

		onSelect(){
				if (!this.props.selected){
				this.props.selectBook(this.props.bookProp);
				} else {
				this.props.selectBook([]);
				}
		}

	 render() {
		var rwClass = classNames({
			'danger': this.props.selected
		});
		return (
			<tr onClick={this.onSelect} className={rwClass} >
				<td>{this.props.bookProp.author}</td>
				<td>{this.props.bookProp.title}</td>
				<td>{this.props.bookProp.barCode}</td>
			</tr>
		)
	}
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectBook }, dispatch);
}

export default connect(null , mapDispatchToProps)(Book);
