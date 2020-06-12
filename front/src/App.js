import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'
import Private from './Private'
import { AnimatePresence } from 'framer-motion'
import { Consumer } from './useLoggin'
import './reset.css'
import './App.css'




function App() {
  const { user } = useContext(Consumer)
  return (
    <>
      <div className='bodyWrapper'>
        <AnimatePresence>
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/registration'>
              <Registration />
            </Route>
            <Route path={`/private/${user.name}${user.surname}`}>
              <Private />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
