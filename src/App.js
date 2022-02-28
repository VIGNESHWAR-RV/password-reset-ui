
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Login } from "./pages/Login/Login";
import { SignUp } from './pages/SignUp/SignUp';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { PasswordReset } from './pages/passwordReset/passwordReset';
import { Page404 } from './pages/Page404/Page404';
import { Users } from './pages/Users/Users';
import { Loader } from './components/loadingComponent/loader';
import { Verified } from "./components/loadingComponent/verified"


function App() {

  useEffect(()=>{
    if(window.location.href === "https://authentication-work-by-rv.netlify.app/login"){
      window.location.href = "https://authentication-by-rv.herokuapp.com"
    }
  },[])
  console.log(window.location.href);

const [loading,setLoading] = useState(false);
const [verified,setVerified] = useState(false);

  return (
    <div className="App">
      <div className='Image'>
         <h1 className='motto'>ITS all about SECURITY</h1>
      </div>
      <div className='page'>
      
         <Switch>
         
           <Route exact path="/">
             <Redirect to="/login"/>
           </Route>

           <Route exact path="/users">  
               <Users/>
           </Route>

           <Route exact path="/login">
               {(verified)? <Verified/> :(loading) ? <Loader/> :""}
              <Login setVerified={setVerified} setLoading={setLoading}/>
           </Route>

           <Route exact path="/signup">
                {(verified)? <Verified/> :(loading) ? <Loader/> :""}
              <SignUp setVerified={setVerified} setLoading={setLoading}/>
           </Route>

           <Route exact path="/forgot_Password">
                {(verified)? <Verified/> :(loading) ? <Loader/> :""}
               <ForgotPassword setVerified={setVerified} setLoading={setLoading}/>
           </Route>

           <Route exact path="/password_Reset/">
              <Redirect to="/login"/>
           </Route>

           <Route exact path="/password_Reset/:id">
                {/* {(verified)? <Verified/> :(loading) ? <Loader/> :""} */}
                <PasswordReset setVerified={setVerified} setLoading={setLoading}/>
           </Route>

           <Route path="**">
                <Page404/>
           </Route>

         </Switch>
      </div>
    </div>
  );
}


export default App;
