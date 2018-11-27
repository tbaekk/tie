import React, { Component } from 'react';
import '../css/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      author: '',
      link: ''
    }
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.name
    });
    this.setState({
      description: this.props.description
    });
    this.setState({
      author: this.props.author
    });
    this.setState({
      link: this.props.link
    });
  }

  onClick(e) {
    
  }

  render() {
    return(
      <div className="Game">
        <h1> {this.state.name} </h1>
        <img src={this.state.link} onClick={this.onClick}/>
        <p>By - {this.state.author} </p>
      </div>
    );
  }
}

export default Game;