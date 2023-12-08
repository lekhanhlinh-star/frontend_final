import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

/**
 * Represents the structure of user information.
 * Use this interface to define the fields of user-related data.
 */
interface UserInfo {
    // Define the structure of user information
    // Adjust this based on your actual user data structure
    _id: string;
    // Add other user-related fields as needed
}

/**
 * A collection of props used by the ChatContext.
 * @interface ChatContextProps
 */
interface ChatContextProps {
    selectedChat?: any; // Adjust the type based on your actual selectedChat data structure
    setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
    user?: UserInfo | null;
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    notification: any[]; // Adjust the type based on your actual notification data structure
    setNotification: React.Dispatch<React.SetStateAction<any[]>>;
    chats?: any; // Adjust the type based on your actual chats data structure
    setChats: React.Dispatch<React.SetStateAction<any>>;
}

/**
 * The ChatContext variable is a React context that stores the chat context props.
 *
 * @type {React.Context<ChatContextProps | undefined>}
 * @since 1.0.0
 */
const ChatContext = createContext<ChatContextProps | undefined>(undefined);

/**
 * Represents a ChatProvider component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children nodes of the component.
 * @returns {JSX.Element} The rendered component.
 */
const ChatProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [selectedChat, setSelectedChat] = useState<any>();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [notification, setNotification] = useState<any[]>([]);
    const [chats, setChats] = useState<any>();
    const history = useNavigate();

    useEffect(() => {
        const userInfoString = localStorage.getItem("_id");
        if (userInfoString) {
            // Parse the stored user information
            const userInfo: UserInfo = {"_id": userInfoString};

            // Update the user state
            setUser(userInfo);

            // Redirect if the user is not available
            if (!userInfo) {
                history("/login");
            }
        } else {
            // Redirect to login if user information is not found
            history("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    const contextValue: ChatContextProps = {
        selectedChat, setSelectedChat, user, setUser, notification, setNotification, chats, setChats,
    };

    return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

/**
 * Represents the state of the chat within a ChatProvider context.
 *
 * @typedef {function} ChatState
 * @throws {Error} If the ChatState is used outside of a ChatProvider context.
 * @returns {object} The context object containing the chat state.
 */
export const ChatState = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatState must be used within a ChatProvider");
    }
    return context;
};

export default ChatProvider;
