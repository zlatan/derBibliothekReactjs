import React, { Component } from 'react';

export default class Pager extends Component{
  constructor(props) {
    super(props);
    this.state = {pageSize: this.props.pageSize, pageNumber: 0};
    this.onChangePageSize = this.onChangePageSize.bind(this);
    }

    onChangePageSize(event){
      this.setState({pageSize: event.target.value})
      this.props.onChangePageSize(event.target.value);
    }

  render() {
		return (
      <div className="row">
        <div className="col-sm-1 col-xs-1 col-md-1" >
                <select id="lang" className="form-control" onChange={this.onChangePageSize} value={this.state.pageSize}>
                   <option value="2">2</option>
                   <option value="5">5</option>
                   <option value="10">10</option>
                </select>
        </div>
        <nav>
          <ul className="pagination">
            <li className="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
            <li className="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li> <a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
