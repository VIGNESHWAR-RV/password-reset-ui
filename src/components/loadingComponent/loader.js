import "./loader.css";
import loading from "../background/loading.gif"

export function Loader(){

    return(
           <div className="loadingDiv">
             <img className="loading" src={loading} alt="loading gif">
             </img>
           </div>
    )
}