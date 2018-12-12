import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import DetailView from "./containers/DetailView";
import HomeView from "./containers/HomeView";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path="/" component={HomeView} />
            <Route path="/:slug" component={DetailView} />
        </div>
      </Router>
    );
  }
}

export default App;
