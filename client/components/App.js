import React, { Component } from 'react';
import axios from 'axios';
import Game from './Game';
import '../css/App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {data: []};
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  getData(ev){
    ev.setState({data: [
      {id: 1, name: 'Tetris', description: '', author:'jypark', link:'https://www.gstatic.com/webp/gallery3/3.png'},
      {id: 2, name: 'Tic-Tac-Toe', description: '', author:'jypark', link: 'https://www.gstatic.com/webp/gallery3/4.png'},
      {id: 3, name: 'Chess', description: '', author: 'timbaek', link: 'https://www.gstatic.com/webp/gallery3/4.png'}
    ]});
    // axios
    //   .get('/gamesList')
    //   .then( res => {
    //     console.log(res);
    //     ev.setState({data: res.data});
    //   });
  }

  render() {
    return (
      <div className="App">
        <div className="App-games">
          {
            this.state.data.map( exp => {
              return  <Game key={exp.id} name={exp.name} description={exp.description} author={exp.author} link={exp.link}/>;
            })
          }
        </div>
      </div>
    );
  }
}
