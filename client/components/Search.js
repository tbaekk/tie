import React, { Component } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap'
import List from './List';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      initialItems: [],
      items: []
    }
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    this.setState({items: this.props.initialItems});
  }

  filterList(event) {
    let updatedList = this.state.initialItems;
    updatedList = updatedList.filter( item => {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  render() {
    return(
      <div className="form">
        <form>
          <FormGroup>
            <FormControl type="text" placeholder="Search" onChange={this.filterList} />
          </FormGroup>
        </form>
        <List items={this.state.items}/>
      </div>
    );
  }
}

export default Search;