import "./loader.css";
import verified from "../background/verified.gif"

export function Verified(){

    return(
           <div className="loadingDiv">
             <img className="loading" src={verified} alt="verfied gif">
             </img>
           </div>
    )
}