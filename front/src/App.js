import React from 'react';
import Main from './Main'
import { Switch, Route } from 'react-router-dom'
import Registration from './Registration'
import Header from './Header'
import Login from './Login'
import Private from './Private'
import './App.css'


function App() {
  return (
    <>
    <Header/>
    <div className='bodyWrapper'>
        <Switch>
                <Route exact path='/'>
                    <Registration/>
                </Route>
                <Route path='/login'>
                  <Login/>
                </Route>
                <Route path='/private'>
                  <Private/>
                </Route>
            </Switch>
    </div>

    {/* <Main/> */}
    </>
  );
}

export default App;
