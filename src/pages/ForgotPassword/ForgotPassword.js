import * as React from "react";
import "./ForgotPassword.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/inputFieldComponent/inputField";
import { API } from "../../API/API";
export function ForgotPassword({setLoading,setVerified}){

    const history = useHistory();

    const [recoveryMail,setRecoveryMail] = useState("");

    const [invalidMail,setInvalidMail] = useState(false);

    const [sentMessage,setSentMessage] = useState();

    let [timer,setTimer] = useState(20);

    const regExp = {email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"};

const Inputs = [{name:"email",
                 type:"email",
                 label:"Email",
                 placeholder:"please enter Email associated with your account",
                 errorMessage:"Enter a Valid Email",
                 required:true,
                 pattern:regExp.email,
                 autoComplete:"email"}]

const handleChange = (e)=>{
    setInvalidMail(false);
    setRecoveryMail({[e.target.name]:e.target.value});
}

const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true);

    if(!(new RegExp(regExp.email).test(recoveryMail.email))){
        return setInvalidMail(true);
    }

    fetch(`${API}/forgot_Password`,
           {method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(recoveryMail)})
    .then((response)=>{
        if(response.status === 400){
            setLoading(false);
            setInvalidMail(true);
        }
        else{
           async function sayLinkSent(){
               const reply = await response.json();
               setLoading(false);
               setVerified(true);
               
               setTimeout(()=>{
                   setVerified(false);
                   setSentMessage(reply.message+"!!!");
                   let i = 0;
                   const redirectionTime = setInterval(()=>{
                                        
                         i++;
                         //console.log(timer,i);
                         setTimer(timer - i);
                         if(i===20){
                          //console.log("stopped");
                          clearInterval(redirectionTime);
                          history.push("/login");
                      }
                   },1000);
               },1000);

         
           }
           sayLinkSent(); 
        }
    })
    //console.log(recoveryMail);
}


    return(
        <>
        {(sentMessage)
        
        ?<div className="forgotPasswordSentDiv">
            <b className="forgotPasswordSentInfo">{sentMessage}</b><br/><br/>
            <b className="forgotPasswordSentInfo">This page will be redirected to login page in {timer} seconds, where you can login</b>
            <br/><br/>
            <a className="forgotPasswordAnchors" target="_blank" rel="noreferrer" href="https://www.gmail.com">CHECK INBOX</a>
        </div>
    
        :
          <form onSubmit={handleSubmit} className="forgotPasswordForm">
              <h1 className="forgotPasswordHeading">Forgot Password??</h1>
              {Inputs.map((input,index)=><Input key={index} {...input} typing={handleChange}/>)}
            
            {invalidMail 
               ?<span className="forgotPasswordError">
                   No account with such Email
                </span>
               :""}
               
              <button className="forgotPasswordSubmit">Verify User</button>
              <div className="forgotPasswordAnchorsDiv">
                 <button className="forgotPasswordAnchors" type="button" onClick={()=>history.push("/login")}>Cancel</button>
              </div>
          </form>}
        </>
    )
}