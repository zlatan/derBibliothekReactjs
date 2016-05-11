import React, { Component } from 'react';
import BookList from './book_list';
import Create from './create';
import Read from './read';
import Update from './update';
import Delete from './delete';
import Pager from './pager';


export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {selectedElement: []};
		this.selectElementTop = this.selectElementTop.bind(this);
	}

	selectElementTop(element){
		this.setState({selectedElement: element})
	}

	render() {
	 	return (
			<div className="panel panel-default">
				<div className="panel-heading">Книги</div>
						<div className="panel-body">
									<Create/>
									<Read selectedElement={this.state.selectedElement}/>
									<Update selectedElement={this.state.selectedElement}/>
									<Delete selectedElement={this.state.selectedElement}/>
						</div>
									<BookList selectElementTop={this.selectElementTop}/>
			  <div className="panel-footer">
						<Pager/>
				</div>
			</div>
		)
 		}
	}
