import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import Home from './Containers/Home';

//Adding CORS here to allow for the client-side to make requests to the API without getting the Access Allow Origin missing error
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //https://eloquent-jackson-ba0dff.netlify.com");   // // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/

function App(){
    return (
        <div className ="App">
            <Router>
                <Route exact path="/" component={Home} />
            </Router>
        </div>
    );
}

export default App;