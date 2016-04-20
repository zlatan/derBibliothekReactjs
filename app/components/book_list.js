import React, { Component } from 'react';
import Book from './book';

export default class BookList extends Component{
	constructor(props) {
		super(props);
		this.state = {uniq: false};
		this.alterUniq = this.alterUniq.bind(this);
		this.selectElement = this.selectElement.bind(this);

		}

		alterUniq(){
			this.setState({uniq: !this.state.uniq})
		}

		selectElement(element){
			this.props.selectElementTop(element);
		}

		render() {
		var books = this.props.books_props.map(book =>
			<Book key={book._links.self.href}
			 			uniq={this.state.uniq}
						alterUniq={this.alterUniq}
						bookProp={book}
						selectElement={this.selectElement}/>
		);
		return (
			 <table  className="table table-bordered table-hover table-striped" >
        <thead>
					<tr>
            	<th>
									<div className="col-xs-6">
									Name <span className="glyphicon glyphicon-sort"></span>
		              <input className="form-control" placeholder="Име" />
									</div>
              </th>
    					<th>
									<div className="col-xs-6">
									Title
									<input className="form-control" placeholder="Заглавие" />
									</div>
							</th>
    					<th className="table-danger">QR Code</th>
    				</tr>
        </thead>
        <tbody>
                {books}
        </tbody>
			</table>

  )
 }
}
