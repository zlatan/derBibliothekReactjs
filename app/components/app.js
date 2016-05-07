import React, { Component } from 'react';
import client from '../client';
import BookList from './book_list';
import follow from '../follow';
import Create from './create';
import Read from './read';
import Update from './update';
import Delete from './delete';
import Pager from './pager';


const root = 'http://localhost:8090/api';

export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {bookSt: [], attributes: [], pageSize: 2, pageNumber: 0, links: {}, selectedElement: []};
		 this.onCreate = this.onCreate.bind(this);
		 this.onUpdate = this.onUpdate.bind(this);
		 this.onDelete = this.onDelete.bind(this);
		 this.onNavigate = this.onNavigate.bind(this);
		 this.onChangePageSize =this.onChangePageSize.bind(this);
		 this.selectElementTop = this.selectElementTop.bind(this);
	}

	loadFromServer(pageSize, pageNumber) {
		follow(client, root, [
			{rel: 'book', params: {size: pageSize, page: pageNumber, sort: ''}}]
		).then(bookCollection => {
			return client({
				method: 'GET',
				path: bookCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return bookCollection;
			});
		}).done(bookCollection => {
			this.setState({
				bookSt: bookCollection.entity._embedded.book,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: bookCollection.entity._links});
		});
	}

	onCreate(newEmployee) {
	follow(client, root, ['book']).then(employeeCollection => {
		return client({
			method: 'POST',
			path: employeeCollection.entity._links.self.href,
			entity: newEmployee,
			headers: {'Content-Type': 'application/json'}
		})
	}).then(response => {
		return follow(client, root, [
			{rel: 'book', params: {'size': this.state.pageSize}}]);
	}).done(response => {
		 this.onNavigate(response.entity._links.last.href);
		});
	}

	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(employeeCollection => {
			this.setState({
				bookSt: employeeCollection.entity._embedded.book,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				pageNumber: this.state.pageNumber,
				links: employeeCollection.entity._links
			});
		});
	}

	onDelete(book) {
	client({method: 'DELETE', path: book._links.self.href}).done(response => {
		this.loadFromServer(this.state.pageSize,this.state.pageNumber);
		});
	}

	onUpdate(book, updateBook) {
		client({
			method: 'PUT',
			path: book._links.self.href,
			entity: updateBook,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': '0'
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize,this.state.pageNumber);
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' +
					book.entity._links.self.href + '. Your copy is stale.');
			}
		});
	}


	onChangePageSize(pageSz){
		this.setState({pageSize: pageSz}, function(){
			this.loadFromServer(this.state.pageSize,this.state.pageNumber);
		});
		// if ( this.state.pageNumber > 1) {
		// 		var newPg = Math.ceil(this.state.pageSize*(this.state.pageNumber+1)/pageSz);
		// } else {
		// 	var newPg = 0;
		// }
		// this.setState({pageSize: pageSz});
		// var last=this.state.links.last.href;
		// var repSz = last.replace(/size=[0-9+]/,"size=".concat(pageSz));
		// var repSzPg = repSz.replace(/page=[0-9+]/,"page=".concat(newPg));
		// this.onNavigate(repSzPg);
	}

	selectElementTop(element){
		this.setState({selectedElement: element})
	}


	componentDidMount() {
		this.loadFromServer(this.state.pageSize,this.state.pageNumber);
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Книги</div>
						<div className="panel-body">
									<Create onCreate={this.onCreate}/>
									<Read selectedElement={this.state.selectedElement}/>
									<Update onUpdate={this.onUpdate} selectedElement={this.state.selectedElement}/>
									<Delete onDelete={this.onDelete} selectedElement={this.state.selectedElement}/>
						</div>
									<BookList books_props={this.state.bookSt}
														selectElementTop={this.selectElementTop}/>
			  <div className="panel-footer">
						<Pager pageSize={this.state.pageSize}
									 onChangePageSize={this.onChangePageSize}/>
				</div>
			</div>
		)
 		}
	}
