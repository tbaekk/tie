import React, { Component } from 'react';
import axios from 'axios';
import Game from './Game';
import Search from './Search';
import logo from '../assets/images/logo.png';
import '../css/App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {data: [], items:[]};
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  getData(ev){
    ev.setState(
      {
        data: [
          {id: 1, name: 'Tetris', description: '', author:'jypark', link:'https://www.gstatic.com/webp/gallery3/3.png'},
          {id: 2, name: 'Tic-Tac-Toe', description: '', author:'timbaek', link: 'https://www.gstatic.com/webp/gallery3/4.png'},
          {id: 3, name: 'Chess', description: '', author: 'jypark', link: 'https://www.gstatic.com/webp/gallery3/3.png'},
          {id: 4, name: '2048', description: '', author:'timbaek', link:'https://www.gstatic.com/webp/gallery3/4.png'},
          {id: 5, name: 'Candy Crush', description: '', author:'jypark', link:'https://www.gstatic.com/webp/gallery3/3.png'},
          {id: 6, name: 'Battle Ship', description: '', author:'timbaek', link:'https://www.gstatic.com/webp/gallery3/4.png'},
        ],
        items: ['Tetris', 'Tic-Tac-Toe', 'Chess', '2048', 'Candy Crush', 'Battle Ship']
      }
    );
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
        <div className="App-header">
          <div className="image">
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <Search initialItems={this.state.items}/>
        </div>
        <div className="App-container">
          <div className="App-games">
            {
              this.state.data.map( exp => {
                return  <Game key={exp.id} name={exp.name} description={exp.description} author={exp.author} link={exp.link}/>;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
