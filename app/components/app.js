import React, { Component } from 'react';
import BookList from './book_list';
import Create from './create';
import Read from './read';
import Update from './update';
import Delete from './delete';
import Pager from './pager';


export default class App extends Component{
	render() {
	 	return (
			<div className="panel panel-default">
				<div className="panel-heading">Книги</div>
						<div className="panel-body">
									<Create/>
									<Read/>
									<Update/>
									<Delete/>
					  </div>
									<BookList/>
			  		<div className="panel-footer">
									<Pager/>
					  </div>
			</div>
			)
 	 }
}
