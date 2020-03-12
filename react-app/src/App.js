/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import './App.css'
import axios from 'axios';

const GIT_USER = 'dhh'
const GIT_USER_URL = `https://api.github.com/users/${GIT_USER}/events`

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      data: [],
      score: 0
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(GIT_USER_URL)
      .then(result => this.setState({
        data: result.data.map(elem => {
          return elem.type
        }),
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  printScore = (data) => {
    const { isLoading } = this.state;
    let score = 0;

    isLoading && data.forEach(elem => {
      switch(elem){
        case "PushEvent":
          score += 5;
          break;
        case "PullRequestReviewCommentEvent":
          score += 4;
          break;
        case "WatchEvent":
          score += 3
          break;
        case "CreateEvent":
          score += 2
          break;
        default:
          score += 1
          break;
      }
    })

    this.setState({
      score
    });
  }

  render() {
    const { data, score } = this.state;

    return (
      <div className="App">
        <div className="App_score">
          {score === 0 ? "n/a" : score}
        </div>
        <button
          type="button"
          className="App_button"
          children="Get Score"
          onClick={() => this.printScore(data)}
        />
      </div>
    );
  }
}
