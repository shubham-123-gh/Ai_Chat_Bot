import { FiMessageSquare } from "react-icons/fi";

const Msg =({chat,hamClick,handleChatClick,select})=>
{
    
    return (
        
        <div className={`recentMsg ${(chat.heading === select)&& `sel`}`}
        onClick={()=>handleChatClick(chat.heading)}>
            <div className="icon">
                <FiMessageSquare />
            </div>
            <div className="msg">
                {!hamClick && <p>{chat.heading}</p>}
            </div>
        </div>
    )
}
export default Msg;