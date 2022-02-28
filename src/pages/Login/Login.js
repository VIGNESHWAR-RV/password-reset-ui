import * as React from "react";
import "./Login.css";
import { useState,useEffect } from "react";
import { Input } from "../../components/inputFieldComponent/inputField";
import { useHistory } from "react-router-dom";
import { API } from "../../API/API";

export function Login({setLoading,setVerified}){


   const history = useHistory(); // to change the end-points and move to other pages

   const [values,setValues] = useState({  //to get the credentials
       userName:"",
       password:""
   });

   const [errorMessage,setErrorMessage] = useState(""); //to display overall error

    //array of objects with input attributes as properties
   const Inputs = [
       {name:"userName",
        type:"text",
        label:"User Name",
        placeholder:"Enter your User Name Here",
        autoComplete:"name"
    },
       {name:"password",
        type:"password",
        label:"Password",
        placeholder:"Enter your Password Here",
        autoComplete:"current-password"  
    }
   ];

   const onChange=(e)=>{
       setErrorMessage(""); //setting the error to "" so it disappears while changing credentials
       setValues({...values,[e.target.name]:e.target.value})  //setting values of the field
   }

   const handleSubmit = (e)=>{ //function to handle and perform submit event
     e.preventDefault();  //preventing the reload on submitting the form

     //checking pattern once again here , since HTML attributes can be changed
     const userNameRegex = new RegExp("^[a-zA-Z0-9]{4,16}$");
     const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

     if(!userNameRegex.test(values.userName) 
        || 
        !strongPasswordRegex.test(values.password)){
      return setErrorMessage("invalid user credentials"); //showing error , if credentials not matched
    }
    
     setLoading(true);


     fetch(`${API}/login`,
           {method:"POST",
           headers:{"Content-Type":"application/json"},
            body:JSON.stringify(values)})
     .then((response) => {
         if(response.status === 400){
            setLoading(false);
            return setErrorMessage("invalid credentials");
            
         }
         else{
             setLoading(false);
             setVerified(true);
             async function getToken(){
               const reply = await response.json();
               sessionStorage.setItem("id",reply.id);
               sessionStorage.setItem("token",reply.token);
              return;
             }
             getToken();
             setTimeout(()=>{
                setVerified(false);
                return  history.push("/users")
               },1000)
           
         }
        })
  
    //can use formData to get the data from inputs too
    //  const data = new FormData(e.target)
    //   console.log(Object.fromEntries(data.entries()));
   }
   useEffect(()=>{
   const token = sessionStorage.getItem("token");
   const id = sessionStorage.getItem("id");

   if(token && id){
       return history.push("/users");
   }
   },[history]);

    return(
        <form className="loginForm" onSubmit={handleSubmit}>
            <h1 className="loginHeading">Welcome Back User!!</h1>
            {Inputs.map((input,index)=> <Input key={index} {...input} typing={onChange} />
            )}
            {errorMessage
              ?<span className="loginError">{errorMessage}</span>
              :""}
            <button className="loginSubmit">
                submit
            </button>
            <div className="loginAnchorsDiv">
                <button type="button" className="loginAnchors" onClick={()=>history.push("/forgot_Password")}>Forgot Password?</button>
                <button type="button" className="loginAnchors" onClick={()=>history.push("/Signup")}>New User?</button>
            </div>
        </form>
    )
};