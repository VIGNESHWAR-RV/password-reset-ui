import { useState } from "react";
import "./inputField.css";

export function Input({label,name,errorMessage,typing,...inputProps}){

    const [focused,setFocused] = useState(false);
    
    const handleFocus=(e)=>{  //function to perform during onBlur event
      setFocused(true)
    }

    return(
        <div className="Input">
           <label htmlFor={name}> {label}</label>
              <input id={name}
                     onChange={typing} 
                     onBlur={handleFocus} //perfroms when a field is clicked and left without filling details with required pattern
                     onFocus={()=>name === "confirm-Password" && setFocused(true)}  // only for sign-up confirm password
                     focused={focused.toString()} //to set it true or false in string
                     name={name} 
                     {...inputProps}
                     />
          <span>{errorMessage}</span>
        </div>
    )
}