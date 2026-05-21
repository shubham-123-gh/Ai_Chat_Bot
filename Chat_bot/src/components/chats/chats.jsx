import "./chats.css";
import ChatbotContext from "../../store/chatBot_context_store";
import Loader from "../loader/loader";

const Chats = ({chat})=>
{
    return(
        <div className={chat.key}>
            <div className="chats">
                <div className="userInp">
                    <div className="imgBox">
                        <img src="./images/user.jpg" alt="user image" 
                        className="img"/>
                    </div>
                    <div className="msg">
                        <p>{chat.userPrompt}</p>
                    </div>
                    
                </div>
                <div className="aiRes">
                    <div className="imgBox">
                        <img src="./images/ai.png" alt="" 
                        className="img"/>
                    </div>
                    <div className="msg">
                        {chat.loading ? (
                            <Loader />
                        ) : (
                            <p>{chat.aires}</p>
                        )}
                    </div>  
                </div>
            </div>
        </div>
    )
}
export default Chats;

