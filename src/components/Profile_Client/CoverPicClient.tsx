import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Container,
    Flex,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    StackDivider,
    Text,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { FollowShow } from "../Profile/Follow";

interface ProfileInfo {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    profilePic: string | undefined;
    coverPhoto: string | undefined;


}

const CoverPicClient = (props: ProfileInfo) => {
    const toast = useToast()
    const [isfollow, setisfollow] = useState(false)
    console.log("----loading--");
    const token = localStorage.getItem("token");
    const host_server=process.env.REACT_APP_SERVER_API_URL
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${host_server}/api/v1/users/${props.id}/follow`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`,
                        }
                    }).then(data => {
                        console.log(data.data.data.isFollowing)
                        if (data.data.data.isFollowing) {
                            setisfollow(true)
                        }
                    })
            } catch {
            }
        };

        fetchData();
    }, [props]);


    const handleClickst = async () => {
        try {
            console.log("onSubmit");
            // Perform any necessary post creation logic here
            console.log("token", token);

            await axios.put(`${host_server}/api/v1/users/${props.id}/follow`, {
                headers: {
                    "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`,
                },
            }).then(response => {
                console.log(response.data);
                toast({
                    title: "Successful", status: "success", duration: 9000, isClosable: true, position: "top",
                });
            }).catch(error => {
                toast({
                    title: error.response.data.message, status: "error", duration: 9000, isClosable: true, position: "top",
                });

            });
        } catch (e) {
            console.log(e);
        }
        setisfollow(!isfollow)

    };




    return (


        <Box bg={"white"}  mt={2}>

            <Container

                bg={"#e9e9e9e9"}
                bgSize="cover"
                bgPosition="center"
                height="500px"
                width="100%"
                position={"relative"}
                justifyContent={"center"}
                // bg={"white"}
            >
                <AspectRatio ratio={16 / 9}>

                    <Image
                        src={`${host_server}/uploads/` + props.coverPhoto}
                        minWidth="800px" maxWidth="800px" borderRadius={10} minHeight="500px" maxH={"500px"}

                    ></Image>
                </AspectRatio>


                <Flex position={"absolute"} zIndex={900} bottom={-165} pr={170} justifyContent={"center"}
                    borderRadius={8}>
                    <VStack
                        divider={<StackDivider />}
                        spacing={3}
                        align="stretch"
                    >
                        <Flex justifyItems={"center-space"} alignItems={"center"}>

                            <Avatar size="xl" name="Segun Adebayo"
                                src={"${host_server}/uploads/" + props.profilePic} />
                            <Heading size="lg">{props.firstName + " " + props.lastName}</Heading>
                        </Flex>


                        <Box width={"500px"}>
                            <Flex minWidth="max-content" alignItems="center" gap="2">
                                <Box p="2">
                                    <Heading size="md">Chakra App</Heading>
                                </Box>
                                <Spacer />

                                <ButtonGroup gap="1">

                                </ButtonGroup>
                            </Flex>

                            <Flex minWidth="max-content" gap="2">

                                <FollowShow data={{
                                    id: props?.id,
                                    status: isfollow
                                }} />
                                <Spacer />
                                <Button onClick={handleClickst}>{isfollow === true ? "Following" : "Follow"} </Button>


                            </Flex>


                        </Box>
                    </VStack>


                </Flex>


            </Container>
        </Box>


    );

}

export default CoverPicClient;
