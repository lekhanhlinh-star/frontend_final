import { Box, Button, Input, VStack, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import {useParams} from "react-router-dom";

const socket = socketIOClient('http://localhost:5000'); // Replace with your Socket.IO server URL

const ChatComponent: React.FC<{ userData: { _id: string }; room: string }> = ({ userData, room }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
    socket.emit('setup', userData);
    socket.on('connected', () => {
        console.log("connected success")
        // socket.emit('join chat', room);
        // console.log("join chat")

    });

    const handleNewMessage = (newMessage: any) => {
        console.log("message received")

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on('message received', handleNewMessage);

    const handleTyping = () => {

        console.log("--------------------------------------")
        setIsTyping(true);
    };
    socket.on('typing',handleTyping);

    const handleStopTyping = () => {
        setIsTyping(false);
    };
    socket.on('stop typing', handleStopTyping);

    return () => {
        console.log("disconnected")
        socket.removeListener('message received', handleNewMessage);
        socket.removeListener('typing', handleTyping);
        socket.removeListener('stop typing', handleStopTyping);
        socket.disconnect();
    }

}, []);

     useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
        console.log(newMessageRecieved)
        setMessages([...messages, newMessageRecieved]);

    });
  });


    const sendMessage = () => {
        socket.emit('new message', { chat: { users: [
            { _id: "124"}]
            }, sender: userData, content: message });
        setMessage('');
    };

    const handleTyping = () => {
        socket.emit('typing', "124");
    };

    const handleStopTyping = () => {
        socket.emit('stop typing', room);
    };

    return (
        <VStack>
            <Box>{userData._id}</Box>
            {messages.map((msg, index) => (
                <Text key={index}>{msg.content}</Text>
            ))}

            {isTyping && <Text>User is typing...</Text>}

                <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                onKeyDown={handleTyping}
                onKeyUp={handleStopTyping}
            />

            <Button onClick={sendMessage}>Send</Button>
        </VStack>
    );
};

export const SocketTest: React.FC = () => {
    const id=useParams()["id"]
    console.log(id)
    return (

          <SimpleGrid columns={2} spacing={10}>
        <ChatComponent userData={{ _id: `${id}`} } room="Room1" />
        {/*<ChatComponent userData={{ _id: 'Person2' }} room="Room1" />*/}
    </SimpleGrid>
    )
}



