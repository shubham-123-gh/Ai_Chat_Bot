import ModeBtn from "../modeBtn/modeBtn";
import "./chatSection.css"
import { BiSend } from "react-icons/bi";
import { useContext, useMemo, useRef } from "react";
import ChatbotContext from "../../store/chatBot_context_store.jsx";
import Chats from "../chats/chats.jsx";
import { FaRegStopCircle } from "react-icons/fa";
const ChatSection = ()=>
{
    const inpData = useRef();
    const {response,chatEnteries} = useContext(ChatbotContext);
    const showResult = useMemo(() => chatEnteries.length > 0, [chatEnteries]);
    const hasPendingResponse = chatEnteries.some((chat)=> chat.loading);

    const handleOnSend = ()=>
    {
        const prompt = inpData.current.value?.trim();
        if (!prompt) {
            return;
        }
        response(prompt);
        inpData.current.value = "";
    }
    const handleOnKeyDown = (event)=>
    {
        if(event.key === "Enter" && !event.shiftKey)
        {
            event.preventDefault();
            handleOnSend();
        }
    }
    
    
    return (
        <div className="chatSection">
            <div className="upperSection">
                {!showResult?
                <div className="heading">
                    <span>HELLO Shubham</span>
                    <span>I am Your Virtual Assistant</span>
                    <span>How Can I Help You</span>
                </div>:
                chatEnteries.map((chat)=>(<Chats key={chat.key} chat={chat}/>))}
            </div>
            <div className="lowerSection">
                <input 
                    type="text" 
                    placeholder="Enter your Prompt" 
                    name="inpData"
                    ref={inpData}
                    autoFocus
                    disabled={hasPendingResponse}
                    onKeyDown={handleOnKeyDown}
                />
                <button 
                    id="sent" 
                    className="mode" 
                    type="button" 
                    onClick={handleOnSend}
                    disabled={hasPendingResponse}
                >
                    {hasPendingResponse ? <FaRegStopCircle /> : <BiSend />}
                </button>
                <ModeBtn/>
            </div>
        </div>
    )
}
export default ChatSection;