import { Avatar, Button, Container, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, Box } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export function FollowShow(data: any) {
    const { isOpen, onOpen, onClose } = useDisclosure(data.onOpen);
    const [getdatafollowing, setgetdatafollowing] = useState<any[]>([]);
    const [getdatafollowers, setgetdatafollowers] = useState<any[]>([]);
    const [tab, settab] = useState(0);
    console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const responsefoing = await axios.get(`http://localhost:5000/api/v1/users/${data.data.id}/following`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "authorization": `Bearer ${token}`,
                    },
                });
                setgetdatafollowing(responsefoing.data.data.following.following);

                const responsefoers = await axios.get(`http://localhost:5000/api/v1/users/${data.data.id}/followers`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "authorization": `Bearer ${token}`,
                    },
                });
                setgetdatafollowers(responsefoers.data.data.followers.followers)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [data.data.status]);

    const navigate = useNavigate();

    const handlenav = async (id_u: string) => {
        // const _id = data.data.postedBy["_id"]
        const userId = localStorage.getItem('_id');

        if (userId == id_u) {
            navigate("/profile/");
        }
        else {
            navigate("/profile/" + id_u);

        }
    }

    return (
        <>
            <Box m={2} onClick={() => { onOpen(); settab(0) }}>
                <Text as="i" fontSize="md" _hover={{ textDecoration: "underline", cursor: "pointer" }} >
                    <Text fontSize="md" as="b" color="tomato" >
                        {getdatafollowing.length}
                    </Text> Following</Text>
            </Box>

            <Box m={2} onClick={() => { onOpen(); settab(1) }}>
                <Text as="i" fontSize="md" _hover={{ textDecoration: "underline", cursor: "pointer" }} >
                    <Text fontSize="md" as="b" color="tomato" >
                        {getdatafollowers.length}
                    </Text > Followers
                </Text>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={600}>
                    <ModalCloseButton />
                    <ModalHeader>Name</ModalHeader>
                    <ModalBody>
                        <Tabs isFitted variant="soft-rounded" colorScheme="gray" defaultIndex={tab}>
                            <TabList mb="1em" >
                                <Tab ml={3}>Following</Tab>
                                <Tab mr={3}>Followers</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {
                                        getdatafollowing.map((x) =>
                                            <Flex direction="column" >
                                                <Flex pt={1} >
                                                    <Flex borderRadius={40} _hover={{ backgroundColor: "gray.200" }} minW={420}
                                                        onClick={() => {
                                                            handlenav(x._id);
                                                            onClose();
                                                            window.location.reload();

                                                        }}>
                                                        <Avatar size="lg" mt={1} name={x.firstName}
                                                            src={`http://localhost:5000/uploads/${x["profilePic"].filename}`} />
                                                        <Flex ml={5} color="black" direction="column">
                                                            <Text mt={6}>{x.firstName} {x.lastName}</Text>

                                                        </Flex></Flex>
                                                    <Button size="md" ml={"auto"} borderRadius={40} px={5} mt={4}>
                                                        Follow
                                                    </Button>
                                                </Flex>
                                            </Flex>)
                                    }
                                </TabPanel>
                                <TabPanel>
                                    {
                                        getdatafollowers.map((x) =>
                                            <Flex direction="column" >
                                                <Flex pt={1} >
                                                    <Flex borderRadius={40} _hover={{ backgroundColor: "gray.200" }}
                                                        onClick={() => {
                                                            handlenav(x._id);
                                                            onClose();
                                                            window.location.reload();
                                                        }} minW={420}>
                                                        <Avatar size="lg" mt={1} name={x.firstName}
                                                            src={`http://localhost:5000/uploads/${x["profilePic"].filename}`} />
                                                        <Flex ml={5} color="black" direction="column">
                                                            <Text mt={6}>{x.firstName} {x.lastName}</Text>

                                                        </Flex></Flex>
                                                    <Button size="md" ml={"auto"} borderRadius={40} px={5} mt={4}>
                                                        Follow
                                                    </Button>
                                                </Flex>
                                            </Flex>)
                                    }
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                </ModalContent>
            </Modal >
        </>
    );
}