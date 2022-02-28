import * as React from "react";
import "./SignUp.css";
import { useState } from "react";
import { Input } from "../../components/inputFieldComponent/inputField";
import { useHistory } from "react-router-dom";
import { API } from "../../API/API";

export function SignUp({setLoading,setVerified}){

   //useHistory to change between pages
    const history = useHistory();

    //useState to get values
   const [values,setValues] = useState({
       firstName:"",
       lastName:"",
       userName:"",
       email:"",
       password:"",
   });

 //regex patterns to check
   const regExp = {firstName:"^[a-zA-Z ]{2,}$",
                   userName:"^[a-zA-Z0-9@#]{4,16}$",
                   email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                   password:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                   };

    //Input fields for signup
   const Inputs = [
       {name:"firstName",
       type:"text",
       label:"First Name",
       placeholder:"Enter your First Name Here",
       errorMessage:"Enter a valid First Name",
       required:true,
       pattern:regExp.firstName,
       autoComplete:"first Name"},

       {name:"lastName",
       type:"text",
       label:"Last Name",
       placeholder:"Enter your Last Name Here",
       errorMessage:"Enter a valid Last Name",
       required:true,
       pattern:regExp.firstName,
       autoComplete:"last Name"},

       {name:"userName",
        type:"text",
        label:"User Name",
        placeholder:"Enter user Name you wish",
        errorMessage:"Enter a User Name with 4-16 characters with no special characters or spaces",
        required:true,
        pattern:regExp.userName,
        autoComplete:"name"},

        {name:"email",
        type:"email",
        label:"Email",
        placeholder:"Enter your Email Here",
        errorMessage:"Enter a Valid Email",
        required:true,
        pattern:regExp.email,
        autoComplete:"email"},

       {name:"password",
        type:"password",
        label:"Password",
        placeholder:"Enter your password Here",
        errorMessage:"Password should be minimum 8 letters with atleast(1 capital , 1 small ,1 number , 1 special character)",
        required:true,
        pattern:regExp.password,
        autoComplete:"current-password"},
        
        {name:"confirm-Password",
        type:"password",
        label:"Confirm Password",
        placeholder:"please confirm your password",
        errorMessage:"Passwords does not match",
        required:true,
        pattern:values.password,
        autoComplete:"current-password"}
   ];

   
   //to update the changes when field is edited
   const onChange=(e)=>{
       setValues({...values,[e.target.name]:e.target.value})
   }

   //function to handle and perform form submission
   const handleSubmit = (e)=>{
     e.preventDefault();

     const {firstName,lastName,userName,email,password} = values;

     setLoading(true);

    
     
     //checking again since changes can be made in HTML attributes using INSPECT
     if(!new RegExp(regExp.firstName).test(values.firstName)
       ||
       !(new RegExp(regExp.firstName).test(values.lastName))
       ||
       !(new RegExp(regExp.userName).test(values.userName))
       ||
       !(new RegExp(regExp.email).test(values.email))
       ||
       !(new RegExp(regExp.password).test(values.password))
       ||
       !(values.password === values["confirm-Password"])
     ){
        return alert("details are incorrect");
     }
    //    return  setTimeout(()=>{
    //     setLoading(false);
    //  },5000)
 

     fetch(`${API}/signup`,
           {method:"POST",
           headers:{"Content-Type":"application/json"},
            body:JSON.stringify({firstName,lastName,userName,email,password})})
     .then((response)=>{
         if(response.status === 400){
             setLoading(false);
             
             const message = async()=>{
                 const reply = await response.json();
                 return alert(reply.message);
             }
             message();
         }
         else{

           setLoading(false);
           setVerified(true);

           setTimeout(()=>{
            setVerified(false);
            return  history.push("/login")
           },1000)

           
         }
     })
    
    //can use formData to get the data from inputs too
    //  const data = new FormData(e.target)
    //   console.log(Object.fromEntries(data.entries()));
   }
   
    return(
        <>
        <form className="signUpForm" onSubmit={handleSubmit}> 
           
            <h1 className="signUpHeading">Hii newbie😀</h1>
            {Inputs.map((input,index)=> <Input key={index} {...input} typing={onChange} />
            )}
            <button className="signUpSubmit">
                submit
            </button>
            <div className="signUpAnchorsDiv">
              <b className="signUpAnchorText">Already Have Account?</b> 
              <button type="button" className="signUpAnchors" onClick={()=>history.push("/login")}>SignIn</button>
            </div>
        </form>
        </>
    )
};