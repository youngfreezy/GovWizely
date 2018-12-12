import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import '../App.css';
class HomeView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      contentType: localStorage.getItem("selectedFilter") || 'articles'
    };
    this.columns = [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: props => {
            return (
              <div>
                <Link to={props.original.url}>{props.original.title}</Link>
              </div>
            )
        }
      },
      {
      Header: 'url',
      accessor: 'url'
      },
      {
      Header: 'excerpt',
      accessor: 'bite'
      }
    ];
    this.onContentTypeChange = this.onContentTypeChange.bind(this);
    this.getAbridgedPosts = this.getAbridgedPosts.bind(this);
    this.getContentType = this.getContentType.bind(this);
  }
  componentDidMount() {
      if (localStorage.getItem("selectedFilter")) {
          this.getContentType();
      } else {
          this.getAbridgedPosts();
      }
  }

  getAbridgedPosts() {
    return axios.get(`https://www.healthcare.gov/api/index.json`)
    .then(response => {
      this.setState({posts: response.data})
    })
    .catch(err => {
      throw new Error(err);
    })
  }

  onContentTypeChange(event) {
    this.setState({contentType: event.target.value}, () => {
      localStorage.setItem('selectedFilter', this.state.contentType);
      this.getContentType()
    });
  }

  getContentType() {
    return axios.get(`https://www.healthcare.gov/api/${this.state.contentType}.json`)
    .then(response => {
      this.setState({posts: response.data[this.state.contentType]})
    })
    .catch(err => {
      throw new Error(err);
    })
  }
 
  render() {
    return (
    <div>
      <select onChange={this.onContentTypeChange} value={this.state.value} className="filters" defaultValue={localStorage.getItem("selectedFilter") || "articles"}>
        <option value="Select Filter" disabled="disabled"> Select Filter </option>
        <option value="articles">articles</option>
        <option value="blog">blog</option>
        <option value="questions">questions</option>
        <option value="glossary">glossary</option>
        <option value="states">states</option>
        <option value="topics">topics</option>
      </select>
      <ReactTable
        data={this.state.posts}
        columns={this.columns}
      />
    </div>
    )
     
    
  }


}
export default HomeView;