import './App.css';
import React, {useEffect} from 'react'
import Header from './Header.js'
import Home from './Home.js'
import Checkout from './Checkout.js'
import Login from './Login.js'
import Products from './Products.js'
import Menu from './Menu.js'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useStateValue} from './StateProvider.js'
import { auth } from './firebase';
import CreateProduct from './CreateProduct.js'
import UnderHeader from './UnderHeader.js'
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
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path = '/login'>
            <Login/>
          </Route>
          <Route path = '/checkout'>
            <Menu/>
            <Header/>
            <UnderHeader/>
            <Checkout/>
          </Route>
          <Route path = '/products'>
            {/* <CreateProduct/> */}
            <Menu/>
            <Header/>
            <UnderHeader/>
            <div className = "app__container">
              
              <Products/>
            </div>
          </Route>
          <Route path = '/'>
            <Menu/>
            <Header/>
            <UnderHeader/>
            <div className = "app__container">
              
              <Home/>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
