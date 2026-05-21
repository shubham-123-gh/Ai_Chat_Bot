import { createContext, useEffect, useReducer, useState } from "react";
import run from "../gemini";

const ChatbotContext = createContext({
  response: () => {},
  chatEnteries: [],
  chatStoreage: [],
  newChat: () => {},
  selectedChatGroup: "",
  loading: false,
});
export default ChatbotContext;

const chatEnteriesReducer = (currVal, action) => {
  let result = currVal;
  if (action.type === "NEW_ENTERIES") {
    return result.map((entry) =>
      entry.key === action.payload.key
        ? {
            ...entry,
            aires: action.payload.incomingResponse,
            loading: false,
            chatGrp: "",
          }
        : entry,
    );
  } else if (action.type === "ENTRERIES_PENDING") {
    result = [
      ...currVal,
      {
        key: action.payload.key,
        userPrompt: action.payload.prompt,
        aires: "",
        loading: true,
        chatGrp: "",
      },
    ];
    return result;
  } else if (action.type === "NEW_CHAT") {
    result = [];
    return result;
  } else if (action.type === "CHAT_CLICKED") {
    result = action.payload.data;
    return result;
  }
  return result;
};

const chatStorageReducer = (currVal, action) => {
  let result = currVal;
  if (action.type === "NEW_CHAT") {
    const heading = `Chat ${action.payload.chatGroup}`;
    const chat = action.payload.chatEnteries.map((entry) => ({
      ...entry,
      chatGrp: heading,
    }));
    result = [
      ...currVal,
      {
        heading,
        chat,
      },
    ];
    return result;
  } else if (action.type === "UPDATE_CHAT_ENTERIES") {
    const heading = action.payload.chatGrp;
    if (!heading) {
      return currVal;
    }
    const chat = action.payload.chatEnteries.map((entry) => ({
      ...entry,
      chatGrp: heading,
    }));

    const exists = currVal.some((entry) => entry.heading === heading);
    if (!exists) {
      return [...currVal, { heading, chat }];
    }

    result = currVal.map((entry) =>
      entry.heading === heading ? { ...entry, chat } : entry,
    );
    return result;
  }
  return result;
};

export function ChatbotContextStore({ children }) {
  const initalChatEnteries = [];
  const initialChatStore = [];

  const [chatNo, setChatNo] = useState(0);
  const [chatGroup, setChatGroup] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedChatGroup, setSelectedChatGroup] = useState("");

  const [chatEnteries, dispatchChatEnteries] = useReducer(
    chatEnteriesReducer,
    initalChatEnteries,
  );
  const [chatStoreage, dispatchChatStorage] = useReducer(
    chatStorageReducer,
    initialChatStore,
  );

  const response = async (prompt) => {
    let no = chatNo + 1;
    setChatNo(no);
    pendingEnteries(no, prompt);

    let incomingResponse = await run(prompt);
    handleEntries(
      no,
      incomingResponse.split("**") && incomingResponse.split("*"),
    );
  };

  const handleEntries = (no, incomingResponse) => {
    setLoading(false);
    const result = {
      type: "NEW_ENTERIES",
      payload: { key: no, incomingResponse },
    };
    dispatchChatEnteries(result);
  };

  const pendingEnteries = (no, prompt) => {
    setLoading(true);
    const result = {
      type: "ENTRERIES_PENDING",
      payload: {
        key: no,
        prompt,
      },
    };
    dispatchChatEnteries(result);
  };
  const newChat = () => {
    const emptyChat = chatStoreage.find((entry) => entry.chat.length == 0);
    console.log(emptyChat);
    
    if(emptyChat)
    {
        setSelectedChatGroup(emptyChat.heading);
        return;
    }
    let no = chatGroup + 1;
    let new_chatgrp = {};
    const data = chatStoreage.find((entry) => entry.heading === selectedChatGroup);
    if(data)
    {
        new_chatgrp = {
        type: "NEW_CHAT",
        payload: {
            chatGroup,
            chatEnteries:[],
        },
        };
    }
    else 
    {
        new_chatgrp = {
        type: "NEW_CHAT",
        payload: {
            chatGroup,
            chatEnteries,
        },
        };
    }
    const result = {
      type: "NEW_CHAT",
    };
    dispatchChatStorage(new_chatgrp);
    dispatchChatEnteries(result);
    setSelectedChatGroup("");
    setChatGroup(no);
  };
  const chatClicked = (key) => {
    setSelectedChatGroup(key);
    const data = chatStoreage.find((entry) => entry.heading === key);
    if (!data) return;
    const result = {
      type: "CHAT_CLICKED",
      payload: {
        data: data.chat,
      },
    };
    dispatchChatEnteries(result);
  };

  useEffect(() => {
    if (!selectedChatGroup) {
      return;
    }
    const result = {
      type: "UPDATE_CHAT_ENTERIES",
      payload: {
        chatGrp: selectedChatGroup,
        chatEnteries,
      },
    };
    dispatchChatStorage(result);
  }, [chatEnteries, selectedChatGroup]);

  return (
    <ChatbotContext.Provider
      value={{
        response,
        chatEnteries,
        loading,
        newChat,
        chatStoreage,
        chatClicked,
        selectedChatGroup
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}
