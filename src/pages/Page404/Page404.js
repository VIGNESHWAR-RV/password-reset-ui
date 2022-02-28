import * as React from "react";
import "./Page404.css";
import gif404 from "../../components/background/404.gif";
import { useHistory } from "react-router-dom";

export function Page404(){

const history = useHistory();

    return (
        <>
        <div className="div404">
            <h1 className="heading404">404</h1>
           <img className="img404" src={gif404} alt="404 gif"></img> 
             <br/>
           <button className="goBackButton" onClick={()=>history.goBack()}>Go back</button>
        </div>
        </>
           )
}