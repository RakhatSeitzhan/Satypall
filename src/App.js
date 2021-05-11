import './App.css';
import React, {useEffect} from 'react'
import Header from './Header.js'
import Home from './Home.js'
import Checkout from './Checkout.js'
import Login from './Login.js'
import Products from './Products.js'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useStateValue} from './StateProvider.js'
import { auth } from './firebase';
function App() {
  const [{user},dispatch] = useStateValue()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  if (!user) console.log(user) 
  else console.log(user.email)
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path = '/login'>
            <Login/>
          </Route>
          <Route path = '/checkout'>
            <Header/>
            <Checkout/>
          </Route>
          <Route path = '/products'>
            <Header/>
            <Products/>
          </Route>
          <Route path = '/'>
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
