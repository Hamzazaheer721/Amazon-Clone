
import './App.css';
import Header from './component/Header';
import Home from './component/Home';
import { BrowserRouter as Router, Switch, Route }  from 'react-router-dom'
import Checkout from './component/Checkout';
import Login from './component/Login';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import { useStateValue } from './component/StateProvider';
import Payment from './component/Payment';
function App() {
  const [state, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log("USER IS ", authUser);
      if(authUser){
        dispatch({
          type : "SET_USER",
          user: authUser
        })
      }else{
        dispatch({
          type : "SET_USER",
          user: null
        })
      }
    })
  },[])

  return (
        <Router>
          <div className="App">
            <Switch>
                <Route path = "/login">   
                  <Login />
                </Route>

                <Route path = "/checkout"> 
                  <Header />    
                  <Checkout />
                </Route>

                <Route path = "/payment">   
                  <Header />
                  <Payment />
                  
                </Route>

                <Route path = "/"> 
                  <Header />   
                  <Home />
                </Route>
            </Switch>
          </div>
        </Router>
  );
}

export default App;
