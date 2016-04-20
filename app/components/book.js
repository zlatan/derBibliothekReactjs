import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class Book extends Component{
	constructor(props) {
    super(props);
		this.state = {clazz: false};
    this.onChangeAlaBala = this.onChangeAlaBala.bind(this);
    }

		onChangeAlaBala(event){
			if (!this.props.uniq && !this.state.clazz) {
								this.setState({clazz: true});
								this.props.alterUniq();
								this.props.selectElement(this.props.bookProp);
			  } else if(this.state.clazz){
						this.setState({clazz: false});
						this.props.selectElement(null);
						this.props.alterUniq();
					}
		}

	render() {
		var rwClass = classNames({
			'': true,
			'danger': this.state.clazz
		});
		return (
			<tr onClick={this.onChangeAlaBala} className={rwClass} >
				<td>{this.props.bookProp.author}</td>
				<td>{this.props.bookProp.title}</td>
				<td>{this.props.bookProp.barCode}</td>
			</tr>
		)
	}
}