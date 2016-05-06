import React, { Component } from 'react';
import Book from './book';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';


class BookList extends Component{
	constructor(props) {
		super(props);
		this.state = {uniq: false};
		this.alterUniq = this.alterUniq.bind(this);
		this.selectElement = this.selectElement.bind(this);
		this.props.fetchWeather();
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(BookList);
