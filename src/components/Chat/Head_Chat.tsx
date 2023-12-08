import {
    Avatar,
    Box,
    Breadcrumb, BreadcrumbLink,
    Button,
    Circle,
    Flex,
    Heading,
    HStack, IconButton,
    Input,
    Spacer,
    Square,
    Tooltip,
    useColorModeValue, WrapItem
} from "@chakra-ui/react";
import DrawerExample from "../MessageDrawer";
import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillCiCircle } from "react-icons/ai";
interface User {
    name: any;

}


export const Head_Chat = (props:User) => {

    // const [listuser, setlistuser] = useState<User[]>([])
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
    //             await axios.get(`http://127.0.0.1:5000/api/v1/chats`,
    //                 {
    //                     headers: {
    //                         'Content-Type': 'application/json', 'authorization': `Bearer ${token}`,
    //                     }
    //                 }).then(respone => {
    //                     if (respone) {
    //                         respone.data.data
    //                             .map((temp: any) => {
    //                                 temp.users
    //                                     .map((temp2: any) => {
    //                                         setlistuser(prevList => [...prevList, {
    //                                             name: temp2.name,
    //                                             id: temp2._id,
    //                                             avt: temp2.profilePic
    //                                         }]);
    //                                     })
    //                             });
    //                     }
    //                 })
    //         } catch {
    //
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <Box as={"nav"} py={3} top={0} height={"70px"}
            zIndex={999}>
            <Flex align="center" justify="center" color={"white"} ml={30}>
                <Box w="16px" h="16px" borderRadius="50%" bg="green" />;
                <Heading alignContent={"center"} textTransform={"capitalize"}  ml={7} border={"29.26px"} fontFamily={"Montserrat"} color={"black"}>{props.name}</Heading>
                <Spacer />

        </Flex>
            </Box>



    );
};