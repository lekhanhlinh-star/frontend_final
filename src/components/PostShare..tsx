import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { FcPanorama } from "react-icons/fc";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export function PostShare(data: any) {
    console.log(data)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    var check_post = false
    try {
        console.log("data", data.data.image[0].filename)
        check_post = true
    }
    catch {

    }
        const host_server=process.env.REACT_APP_SERVER_API_URL


    var like_count = data.data.likes.length
    if (like_count == 0) {
        like_count = ""
    }



    const [dataofreply, setdataofreply] = useState<any>(null);
    const [isreply, setisreply] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data.data.replyTo) {
                    await axios.get(`${host_server}/api/v1/posts/${data.data.replyTo}`).then(data => {
                        console.log(data.data["data"]["doc"])
                        setdataofreply(data.data["data"]["doc"])
                        setisreply(true)
                    })
                }
            }
            catch {
            }
        };

        fetchData();
    }, []);


    const handlelike = (id: number) => {
        console.log(id)
        axios.put(`${host_server}/api/v1/posts/${id}/like`);
        const button = document.getElementById(
            id.toString(),
        ) as HTMLInputElement;

        const icon = button?.querySelector('.bi-like') as HTMLElement;
        const like_c = button.textContent
        console.log(icon.style.color)


        if (icon) {
            if (icon.style.color === "black") {
                icon.style.color = "blue";
            } else {

                icon.style.color = "black";
            }
        }
    }


    const [islike, setIslike] = useState('black');



    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${host_server}/api/v1/posts/${data.data._id}/like`).then(data => {
                    if (data && data.data.data.isLiked) {
                        setIslike('blue')
                    }
                })

            }
            catch {
            }
        };

        fetchData();
    }, []);

    // ------------


    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [formDataPost, setFormDataPost] = useState({
        content: "", image: File || null,

    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        let { name, value } = event.target;
        name = "image"

        console.log("name", name)
        console.log("File changed", value)
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: selectedFile,
        }));

    };

    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            console.log("onSubmit")
            console.log(formDataPost);
            console.log("----loading--")
            const token = localStorage.getItem("token");

            console.log("token", token)
            console.log(`id is ${data.data._id}`)


            axios.post(`${host_server}/api/v1/posts`, {
                content: formDataPost.content,
                image: formDataPost.image,
                replyTo: data.data._id,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data', 'authorization': `Bearer ${token}`,
                },
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
            // Reset the form
            setFormDataPost({
                content: "", image: File
            });

        } catch (e) {
            console.log(e)
        }

    }

    const navigate = useNavigate();

    const handlenav = (id: string) => {
        navigate("/post/" + id);
    }


    const profileclick = () => {
        // direct to profile
    }

    const postclick = (id: string) => {
        // handlenav(id)
        handlenav(id)
    }

    // console.log(data.postedBy["profilePic"].filename)

    return (<Card backgroundColor={"lightgray"} >


        {
            check_post ? (<Image
                objectFit='cover'
                src={`${host_server}/uploads/${data.data.image[0].filename}`}
            />) : null
        }

        <CardHeader >
            <Flex letterSpacing={4}>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar style={{ cursor: 'pointer' }} name='Segun Adebayo' src={`${host_server}/uploads/${data.data.postedBy["profilePic"].filename}`} />
                    <Box>
                        <Heading size='sm'></Heading>

                        <Text style={{ cursor: 'pointer' }}>{`${data.data.postedBy["firstName"]} ${data.data.postedBy["lastName"]}`}</Text>
                    </Box>
                </Flex >

            </Flex >
        </CardHeader >



        <CardBody onClick={() => postclick(data.data._id)} alignItems={"left"} style={{ cursor: 'pointer' }}>
            <Text>
                {data.data.content}
            </Text>
        </CardBody>

    </Card >);
}