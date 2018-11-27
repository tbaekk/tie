import React, { Component } from 'react';

class List extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.setState({items: this.props.items});
  }

  render() {
    return(
      <ul className="list-group">
        {
          this.props.items.map( item => {
            return <li className="list-group-item" data-category={item} key={item}>{item}</li>
          })
        }
      </ul>
    );
  }
}

export default List;