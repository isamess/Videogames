import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home';


import Detail from './components/Detail/Detail.jsx'
import CreateVideogame from './components/CreateVideogame/CreateVideogame.jsx'
// import About from "./components/About/About";



function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/addgame" component={CreateVideogame} />
          <Route exact path="/videogame/:id" component={Detail} />
        </Switch>
      </React.Fragment>
    </div>
    </BrowserRouter>
);
}

export default App;
