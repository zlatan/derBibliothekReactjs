import React, { Component } from 'react';
import Book from './book';
import Header from './header';

import { connect } from 'react-redux';
import { fetchWeather } from '../actions/index';
import { bindActionCreators } from 'redux';
import * as config from '../config';

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

		componentDidMount() {
			this.props.fetchWeather(config.DEFALT_PAGE_SIZE,config.DEFALT_PAGE_NUMBER);
		}

		render() {
		 if (this.props.weather[0]){
		 var books = this.props.weather[0]._embedded.book.map(book =>
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
								<Header/>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
