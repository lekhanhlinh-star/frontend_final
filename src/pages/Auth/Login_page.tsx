'use client'

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Spacer,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios';


import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

export default function Login_page() {

    const navagate = useNavigate()
    const [show, setShow] = React.useState(false)
    const toast = useToast()
    const [inputLoginBody, setInputLoginBody] = useState({
        'email': "", 'password': ""
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputLoginBody((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    }
    const [showPassword, setShowPassword] = useState(false)
    const host_server=process.env.REACT_APP_SERVER_API_URL

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();


            await axios.post(`${host_server}/api/v1/users/login`, JSON.stringify(inputLoginBody), {
                headers: {
                    'Content-Type': 'application/json',

                },
            }).then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('_id', response.data.data["user"]._id)

                    toast({
                        title: 'Login successful', status: 'success', duration: 9000, isClosable: true, position: 'top',
                    })
                    navagate('/');
                }


            }).catch(e => {
                console.log(e);
                if (e.response.status == 401) {
                    toast({
                        title: "Invalid email or password",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'top',
                    })
                } else if (e.response.status == 400) {
                    toast({
                        title: "Please provide email and password",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'top',
                    })
                }
            })


        } catch (error) {
            console.error('Login error:', error);
        }

    };
    const handleClick = () => setShow(!show)
    return (<Flex
        minH={'100vh'}
        align={'center'}

        bgGradient={"linear(to-r,#0083B0,#8732A5,#A81FA2,#DB009E)"}

    >

        <Stack direction={['column', 'row']} maxW={'lg'} bg={"white"} mx={"auto"} justify={'center'}
               borderRadius={"8px"} alignContent={"center"}>
            {/*<Stack align={'center'}>*/}

            {/*</Stack>*/}
            <Box
                bg={"white"}
                rounded={'lg'}

                // boxShadow={'lg'}
                minW={500}
                minH={400}

                p={8}>
                <form onSubmit={handleLogin}>
                    <Stack spacing={4}>
                        <Heading fontSize={'3xl'}>Log in</Heading>
                        <Flex>
                            <Spacer></Spacer>
                            <Avatar size={"lg"} src={"logo.png"}></Avatar>
                            <Spacer></Spacer>

                        </Flex>
                        <Text>
                            Wellcome to your website
                        </Text>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name={"email"} required={true} onChange={handleInputChange}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name={"password"}
                                       onChange={handleInputChange}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'} cursor={"pointer"} onClick={e => {
                                    e.preventDefault();
                                    navagate('/forgetPassword');

                                }}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                type={"submit"}
                                _hover={{
                                    bg: 'blue.500',

                                }}>
                                Sign in
                            </Button>
                            <Text align={'center'}>
                                Don't have a user? <Link color={'blue.400'} onClick={() => {
                                navagate("/signup")
                            }}>Register</Link>
                            </Text>
                        </Stack>

                    </Stack>
                </form>

            </Box>


            {/*[]*/}
            <Stack
                bg={"white"}
                borderRadius={"0 8px 8px 0"}
                bgGradient='radial( #CF81F4,#5038ED)'
                align={"center"}
                justify={"center"}
                position="relative" // Add this
            >
                <Box
                    // bg="tomato"
                    p={2}
                    h="250px"
                    w={"200px"}
                    backdropBlur={"13.6"}
                    border="solid"  // Add this
                    borderColor={"rgba(213,198,198,0.5)"}  // Add this
                    borderWidth="5px"  // Add this
                    fontFamily={"Poppins"}
                    borderRadius={"20px"}
                    fontStyle={" normal"}
                    fontWeight={"700"}
                    fontSize={"32px"}
                    lineHeight={"46px"}

                    textAlign={"left"}
                    color={"#FFFFFF"}

                    // w="100px"
                    position="absolute" // Add this
                    top={"30%"} // Adjust as needed
                    left={"50%"} // Adjust as needed
                    transform={"translate(-90%, -50%)"} // This ensures the box is centered
                >
                    Very good
                    works are
                    waiting for
                    you Login
                    Now!!!


                </Box>
                <Image zIndex={"999"} mr={"180px"} minW={"500px"} src={"img.png"}/>
            </Stack>

        </Stack>


    </Flex>)
}