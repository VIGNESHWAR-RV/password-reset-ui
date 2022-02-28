import * as React from "react";
import "./Users.css";
import hi from "../../components/background/hi.gif";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../../API/API";
import { Loader } from "../../components/loadingComponent/loader";

export function Users(){

   

    const history = useHistory();

    const [loading,setLoading] = useState(true);

    const [userData,setUserData] = useState("");   


    useEffect(()=>{
      const id = sessionStorage.getItem("id");
      const token = sessionStorage.getItem("token");

       fetch(`${API}/users`,
       {method:"GET",
        headers:{token,id} })
        .then((response)=>{
            setLoading(false);
           if(response.status === 400){
               sessionStorage.clear();
               history.push("/login");
           } 
           else{
               async function getUserData(){
                  const reply = await response.json();
                  setUserData(reply.userData);
               }
               getUserData();
           }
        })
    },[history]);

const signOut = ()=>{
    sessionStorage.clear();
    return history.push("/login");
}

    return(
        <>
        {(loading)
           ?<Loader/>
           :""}
        {(userData)
          ?
          <>
           <div className="welcomeOuterDiv">
               <img className="welcomeImg" src={hi} alt="hiii"></img>
           
                <h1 className="welcomeHeading"> {userData.firstName + " " + userData.lastName}</h1>
                <b className="welcomeInfo">your account is secured </b>
                <br/>
                <p className="welcomeNote">
                    <b className="welcomeBold">Note</b><br/>
                    We are still improving a lot to keep your privacy private
                </p>
                <br/>
                <button className="welcomeAnchors" onClick={signOut}>👉Sign Out👈</button> 
           </div>
         
         </>
          :""}
        </>
    )
}