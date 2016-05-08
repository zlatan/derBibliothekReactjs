import React, { Component } from 'react';
import Book from './book';
import { connect } from 'react-redux';


class BookList extends Component{
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
		 if (this.props.weather[0]){
		 var books = this.props.weather[0].map(book =>
		 	<Book key={book._links.self.href}
		 	 			uniq={this.state.uniq}
		 				alterUniq={this.alterUniq}
		 				bookProp={book}
		 				selectElement={this.selectElement}/>
					);
				}
		return (
			 <table  className="table table-bordered table-hover table-striped" >
        <thead>
					<tr>
            	<th>
									<div className="col-xs-6">
 									<span className="glyphicon glyphicon-sort"></span>
									<input className="form-control" placeholder="Име"/>
									</div>
              </th>
    					<th>
									<div className="col-xs-6">
									<input className="form-control" placeholder="Заглавие" />
									</div>
							</th>
    					<th className="table-danger">Сигнатура</th>
    				</tr>
        </thead>
        <tbody>
                {books}
        </tbody>
			</table>

  )
 }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(BookList);
