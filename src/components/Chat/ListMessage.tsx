'use client'

import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    Heading,
    Input,
    Spacer,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'


interface User {
    name: string;
    avt: string | null;
    id: string;
}

interface CurChat {
    currentid: string;
    user: User
}

export default function ListMessage({ setcurrentchatinfo }: any) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    return (<Flex bg={useColorModeValue("#ffffff", 'gray.900')}
        minW={"450px"}
        borderRight={"10px"}
        borderRightColor={"#ff0000"}
        border="1px solid #d9d9d9d9"
    >
        <SidebarContent setcurrentchatinfo={setcurrentchatinfo} onClose={() => onClose}
            display={{ base: 'none', md: 'block' }} />
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            onOverlayClick={onClose}

        >
            <DrawerContent>
                <SidebarContent setcurrentchatinfo={setcurrentchatinfo} onClose={onClose} />
            </DrawerContent>
        </Drawer>


        <Box ml={{ base: 0, md: 60 }} p="4">
        </Box>

    </Flex>)
}

interface SidebarProps extends BoxProps {
    onClose: () => void
    setcurrentchatinfo: Function
}

const SidebarContent = ({ onClose, setcurrentchatinfo, ...rest }: SidebarProps) => {
    const toast = useToast()
    const host_server=process.env.REACT_APP_SERVER_API_URL
    const [curchat, setcurchat] = useState<CurChat[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                await axios.get(`${host_server}/api/v1/chats`, {
                    headers: {
                        'Content-Type': 'application/json', 'authorization': `Bearer ${token}`,
                    }
                }).then(respone => {
                    if (respone) {
                        respone.data.data
                            .map((temp: any) => {
                                var chatid = temp.chatid
                                temp.users
                                    .map((temp2: any) => {
                                        setcurchat(prevList => [...prevList, {
                                            currentid: chatid, user: {
                                                name: temp2.name, id: temp2._id, avt: temp2.profilePic
                                            }
                                        }]);
                                    })
                            });
                    }
                })
            } catch {

            }
        };
        fetchData();
    }, []);


    const handleClick = (link: CurChat) => {
        setcurrentchatinfo(link)
        const element = document.getElementById(link.user.id);
        console.log(element?.textContent)
        if (String(element?.textContent) == "New message" && element) {
            element.textContent = '';
        }

    }

    return (<Flex
        // ml={"100px"}
        height={"100%"}
        position={"fixed"}
        overflowX={"hidden"}
        overscrollBehaviorY={"contain"}

        // overscrollBehavior={"none"}
        style={{ transition: "transform 0.3s ease-in-out" }}

        {...rest}>



        <Flex

            my={"50px"}
        >
            <Input height={"52px"} marginLeft={30} width={"370px"} placeholder={"Bạn bè, nhóm, tin nhắn..."}
                fontFamily={"Montserrat"} fontWeight={"400"} lineHeight={"19.5px"} fontSize={"16px"}
                borderRadius={"40px"} border={"3px"} borderColor={"#E9E9E9"} bg={"#E9E9E9"}></Input>
        </Flex>


        <Box
            overflowY={"hidden"}
        >
            {curchat.map((link: CurChat) => <Flex alignItems={"center"} style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                minW={"342px"}
                minH={"88px"}
                alignContent={"center"}
                gap={"16px"}
                borderRadius={"16px"}

                maxW={"342px"}
                maxH={"88px"}

                cursor="pointer"
                _hover={{
                    bg: "#F5DFFF", color: 'white', // bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
                }}
                marginLeft={"34px"}
                onClick={() => handleClick(link)}
            >
                <Avatar height={"72px"} width={"72px"} src={`http://localhost:5000/uploads/${link.user.avt}`}
                    mx={3}></Avatar>
                <Text textTransform={"capitalize"} fontFamily={"Montserrat"} lineHeight={"21.94px"} fontWeight={"700"}
                    fontSize={"18px"}> {link.user.name}</Text>
                <Spacer></Spacer>
                <Text textTransform={"capitalize"} fontSize={"14px"} fontFamily={"Montserrat"} lineHeight={"17.07px"} align={"right"}
                    fontWeight={"400"} mr={"10px"} >11:04</Text>
            </Flex>)}
        </Box>

    </Flex>)
}

