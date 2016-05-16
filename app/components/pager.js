import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../actions/index';
import { bindActionCreators } from 'redux';
import { setPageSize } from '../actions/set_page_size';
import * as config from '../config';
import stompClient from './websocket-listener';


var firstG, lastG, nextG, prevG;

class Pager extends Component{
    constructor(props) {
    super(props);
    this.state = {pageSize: config.DEFALT_PAGE_SIZE,
                  pageNumber: config.DEFALT_PAGE_NUMBER}
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
    this.addElement = this.addElement.bind(this);
    }

    componentDidMount() {
      stompClient.register([
                          {route: '/topic/newBook', callback: this.addElement},
                          {route: '/topic/updateBook', callback: this.refreshCurrentPage},
                          {route: '/topic/deleteBook', callback: this.refreshCurrentPage}
                        ]);
    }

      addElement(){
        if (this.props.sortBy == 'id,asc' )
        {
          this.props.fetchWeather(this.state.pageSize,this.state.pageNumber,this.props.sortBy);
          if (lastG)
          {
            this.lastPage();
          }
        }
      }


      refreshCurrentPage(msg){
        var currentState = this.props.weather[0]._embedded.book.map( book =>
              book._links.self.href.match(/book\/([0-9]+)/)[1] );
        var remoreChange = JSON.parse(msg.body);

        if ( currentState.indexOf(remoreChange.ID.toString()) != -1 ) {
          this.props.fetchWeather(this.state.pageSize,this.state.pageNumber,this.props.sortBy);
        }

      }

    onChangePageSize(event){
      this.props.setPageSize(event.target.value);
      this.setState({pageSize: event.target.value})
      var newPage = Math.floor((this.state.pageSize*(parseInt(this.state.pageNumber)))/(event.target.value));
      this.setState({pageNumber: newPage})
      this.props.fetchWeather(event.target.value,newPage,this.props.sortBy);
    }

    nextPage(){
          this.props.fetchWeather(this.state.pageSize,nextG,this.props.sortBy);
          this.setState({pageNumber: nextG});
      }

    prevPage(){
      this.props.fetchWeather(this.state.pageSize,prevG,this.props.sortBy);
      this.setState({pageNumber: prevG});
    }

    firstPage(){
      this.props.fetchWeather(this.state.pageSize,firstG,this.props.sortBy);
      this.setState({pageNumber: firstG});
    }

    lastPage(){
      this.props.fetchWeather(this.state.pageSize,lastG,this.props.sortBy);
      this.setState({pageNumber: lastG});
    }

  render() {
    var navLinks = [];
    var infoLine = [];
    if (this.props.weather[0]){
      if(this.props.weather[0].page.totalElements){
        var totalElements = this.props.weather[0].page.totalElements;
      }

      if(this.props.weather[0].page.number){
        var number = this.props.weather[0].page.number;
        number = number + 1;
      } else {
        var number = config.DEFALT_PAGE_NUMBER + 1;
      }

      if(this.props.weather[0].page.totalPages){
        var totalPages = this.props.weather[0].page.totalPages;
        infoLine.push(
          <div key="infoLine">
          <div className="col-sm-1 col-xs-1 col-md-1" >
                   <select id="lang" className="form-control" onChange={this.onChangePageSize} value={this.state.pageSize}>
                   <option value={config.DEFALT_PAGE_SIZE}>{config.DEFALT_PAGE_SIZE}</option>
                   <option value="3">3</option>
                   <option value="5">5</option>
                   <option value="10">10</option>
                </select> книги на стр.
        </div>
        <div>от общо {totalElements}</div>
        <div> Стр: {number} от  {totalPages} </div>
      </div>);
      }

      if(this.props.weather[0]._links.first){
         firstG = this.props.weather[0]._links.first.href.match(/page=([0-9]+)/)[1];
        navLinks.push(<li key="first" onClick={this.firstPage}> <a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>);
      }

      if(this.props.weather[0]._links.prev){
         prevG = this.props.weather[0]._links.prev.href.match(/page=([0-9]+)/)[1];
        navLinks.push(<li key="prev" onClick={this.prevPage}><a>Previous</a></li>);
      }

      if(this.props.weather[0]._links.next){
         nextG = this.props.weather[0]._links.next.href.match(/page=([0-9]+)/)[1];
        navLinks.push(<li key="next" onClick={this.nextPage}><a>Next</a></li>);
      }

      if(this.props.weather[0]._links.last){
         lastG = this.props.weather[0]._links.last.href.match(/page=([0-9]+)/)[1];
        navLinks.push(<li key="last" onClick={this.lastPage}> <a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>);
      }
    }
		return (
      <div className="row">
        {infoLine}
        <nav>
          <ul className="pagination">
          {navLinks}
          </ul>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    sortBy: state.sortBy
   };
}

function mapDispatchToProps(dispatch) {
  return {
    setPageSize: bindActionCreators(setPageSize, dispatch),
    fetchWeather: bindActionCreators(fetchWeather, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pager);
