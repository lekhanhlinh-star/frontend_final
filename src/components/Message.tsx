import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    InputRightElement,
    Spacer, Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import ListMessage from "./Chat/ListMessage";
import {Head_Chat} from "./Chat/Head_Chat";
import axios from "axios";
import socketIOClient from 'socket.io-client';
import {IoIosSend} from "react-icons/all";
import Message_bar from "./Chat/Message_bar";

interface Mess {
    content: string | null;
    sender: number;
    // createAt: string;
}

interface User {
    name: string|null;
    avt: string ;
    id: string;
}

interface CurChat {
    currentid: string;
    user: User
}

interface userData {
    _id: string | null
}

const socket = socketIOClient('http://localhost:5000'); // Replace with your Socket.IO server URL

export function Message() {
    const [currentchatinfo, setcurrentchatinfo] = useState<CurChat>()

    const [currentmess, setcurrentmess] = useState<Mess[]>([]);
    const [message, setMessage] = useState("");

    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

const [loading, setLoading] = useState(false);
    const userid = localStorage.getItem("_id")

    const userdata: userData = {
        _id: userid
    }

    useEffect(() => {
        console.log("use")
        socket.emit('setup', userdata);

        socket.on('connected', () => {
            console.log("connected success")
            setSocketConnected(true)
        });

        const handleNewMessage = (newMessage: any) => {
            console.log("message received")
            setcurrentmess((prevMessages) => [...prevMessages, newMessage]);
        };
        socket.on('message received', handleNewMessage);

        const handleTyping = () => {
            console.log("--------------------------------------")
            setIsTyping(true);
        };
        socket.on('typing', handleTyping);

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
            if (currentchatinfo?.user.id === newMessageRecieved.sender._id) {
                setcurrentmess([...currentmess, {
                    content: newMessageRecieved.content, sender: 0
                }]);

            }
            else {
                console.log(newMessageRecieved)
                const element = document.getElementById(newMessageRecieved.sender._id);
                if (element?.textContent == "") {
                    element.textContent = 'New message';
                    element.style.color = 'red';
                }
            }



        });
    });

    const handleTyping = () => {

        socket.emit('typing', currentchatinfo?.user.id);
    };

    const handleStopTyping = () => {
        socket.emit('stop typing', currentchatinfo?.user.id);
    };


    const handleclick = async (e: any) => {
        try {

            if (e.key === "Enter" && message) {
                console.log("onSubmit")
                if (message && currentchatinfo) {
                    socket.emit('new message', {
                        chat: {
                            users: [{_id: currentchatinfo?.user.id}]
                        }, sender: userdata, content: message
                    });
                    socket.emit("stop typing", currentchatinfo?.user.id);

                    setcurrentmess([...currentmess, {
                        content: message, sender: 1
                    }]);
                    setMessage('');
                    console.log(message, currentchatinfo)
                    const token = localStorage.getItem("token");
                    await axios.post('http://localhost:5000/api/v1/messages', {
                        content: message, chatId: currentchatinfo.currentid,
                    }, {
                        headers: {
                            'Content-Type': 'application/json', 'authorization': `Bearer ${token}`,
                        },
                    }).then(response => {
                        if (response) {
                            console.log(response.data);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }


        } catch (e) {
            console.log(e)
        }

    }


    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true)
                if (currentchatinfo) await axios.get(`http://127.0.0.1:5000/api/v1/messages/${currentchatinfo.currentid}`).then(data => {
                    if (data) {
                        setcurrentmess(data.data.data.arr)
                        setLoading(false);
                    }

                })
            } catch {
            }
        };

        fetchData();
    }, [currentchatinfo]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [currentmess]);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };
    const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", currentchatinfo?.user.id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", currentchatinfo?.user.id);
                setTyping(false);
            }
        }, timerLength);
    };


    return (
            <Flex
                bgGradient={useColorModeValue("linear(to-l,white,white)", "linear(to-l,#05020b,#34073d)")} overflow={"hidden"}
            >



                        <Message_bar></Message_bar>


                <ListMessage setcurrentchatinfo={setcurrentchatinfo}/>



                <Box

                    box-shadow="-3px 0px 15px 0px #0000001A"
                    borderLeft={"100px"}
                    borderColor={"red"}
                    bg='#FFFFFF'
                    // maxW={"9000px"}
                    width={"100%"}
                        // minWidth={"70%"}

                >
                    <Head_Chat name={currentchatinfo?.user.name}></Head_Chat>
                    <Flex
                        direction="column"
                        minWidth={"100%"}
                        h="89vh"
                        // w={"162vh"}
                        boxSizing={"border-box"}
                        marginTop={5}
                    >

                        <Stack bg="#ffffff" flex="100%"  overflowY="scroll" ref={containerRef}
                        >

                            <Flex direction="column">

                                {currentmess.map((message, index) => (<>
                                    { message.sender === 1 ? <></>: <Avatar h={"56px"} w={"56px"} ml={"50px"} mb={"10px"} src={"http://localhost:5000/uploads/1700656445602.png"}></Avatar> }
                                    <Box

                                    key={index} // Don't forget to include a unique key for each item in the map function
                                    bg={message.sender === 1 ? "#F5DFFF" : "rgba(84,73,243,0.85)"}

                                    borderRadius={message.sender === 1 ? "20px 0px 20px  20px" : "0px 20px 20px 20px"}
                                    padding="8px"
                                    fontSize={"16px"}
                                    maxHeight="100px" /* Set a maximum height for the container */
                                    mx={"65px"}
                                    marginBottom="8px"
                                    textAlign={"justify"}
                                    alignSelf={message.sender === 1 ? "flex-end" : "flex-start"}
                                    maxW="45%"
                                >

                                    <Text fontFamily={"Montserrat"} lineHeight={"30px"}  fontWeight={"400"}>
                                        {message.content}
                                    </Text>
                                </Box>
                                </>))}


                                {isTyping ? (<div>
                                    <Text>typing</Text>

                                    </div>) : (<></>)}
                            </Flex>

                        </Stack>

                        <Box bg="white" flex="10%" pt={5} >
                            <Flex alignItems={"center"}>


                                <FormControl onKeyDown={handleclick}
                                >


                                    <Input borderRadius={"40px"} placeholder={"Type a Message"}
                                           mx={5} h={"65"} onChange={typingHandler}
                                           minW={"70%"}
                                           w={"50%"}
                                           value={message}

                                           color={"black"}
                                           mb={"70px"}
                                    >
                                    </Input>
                                </FormControl>




                            </Flex>
                        </Box>
                    </Flex>

                </Box>


            </Flex>




    );
}


