import React, { Component } from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { sortBy } from '../actions/sort';
import { bindActionCreators } from 'redux';

class Header extends Component{
  constructor(props) {
		super(props);
		this.state = {sortClass: true, sortByNameAsc: true};
		this.sortByName = this.sortByName.bind(this);
		}


    sortByName(field){
      if(!this.state.sortByNameAsc){
        this.props.sortBy("name,asc")
      } else {
        this.props.sortBy("name,desc")
      }
      this.setState({sortClass: !this.state.sortClass});
      this.setState({sortByNameAsc: !this.state.sortByNameAsc});
    }

  render() {
    var sortClass = classNames({
      'glyphicon glyphicon-sort-by-attributes-alt': !this.state.sortClass,
      'glyphicon glyphicon-sort-by-attributes': this.state.sortClass
    });

  return (
        <tr>
            <th>
                <div className="col-xs-6">
                <span  onClick={this.sortByName.bind(null, "name")} className={sortClass}></span>
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
  )
}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortBy }, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);
