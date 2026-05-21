import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import "./modeBtn.css"

const ModeBtn =()=>
{
    const[mode,setMode] = useState(true);

    const handleMode =()=>
    {
        setMode(!mode);
        
    }
    useEffect(()=>
        {
            if(mode)
            {
                document.body.className = "darkMode"
            }
            else
            {
                document.body.className = "lightMode"
            }
        },[mode]
    )
    return(
        <div className="btn">
            <button className="modebtn" onClick={handleMode}>
                {mode?<MdOutlineLightMode />:<MdDarkMode/>}
            </button>
        </div>
    )
}
export default ModeBtn;