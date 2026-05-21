import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";

import "./sidebar.css"
import { useContext, useState } from "react";
import ChatbotContext from "../../store/chatBot_context_store";
import Msg from "./msg";


const Sidebar = ()=>
{
    const [hamClick,setHamClick] = useState(false);
    const {chatStoreage,newChat,chatClicked,selectedChatGroup} = useContext(ChatbotContext)
    const chatCount = chatStoreage.length > 0;
    const handleOnhamClick =()=>
    {
        setHamClick(!hamClick);
    }
    const handleChatClick = (key)=>
    {
        chatClicked(key);
    }
    return (
        <div className="sidebar">
            <div className="ham">
                <GiHamburgerMenu onClick={handleOnhamClick}/>
            </div>
            <div className="newChat"
            onClick={newChat}>
                <div className="icon">
                    <IoMdAdd />
                </div>
                <div className="msg">
                    {!hamClick && <p>New Chat</p>}
                </div>
            </div>
            {chatCount&&chatStoreage.map((chat)=>
            (
                <Msg 
                key={chat.heading} 
                chat={chat} 
                hamClick={hamClick}
                handleChatClick={handleChatClick}
                select={selectedChatGroup}/>
            ))}
        </div>
    )
}
export default Sidebar;