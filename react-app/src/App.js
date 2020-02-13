import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import UserList from './components/user-list'

function App() {
  return (
    <div className="App">
      <Route path='/users' component={UserList} />
    </div>
  );
}

export default App;
