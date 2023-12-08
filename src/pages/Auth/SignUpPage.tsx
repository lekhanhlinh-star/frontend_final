'use client'

import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack, Image,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import React, {useState} from 'react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {
    const navagate = useNavigate()
    const toast = useToast()

    const [InputBodySignUp, setInputBodySignUp] = useState({
        email: '', password: '', firstName: '', lastName: '', passwordConfirm: ""

    });
    const [showPassword, setShowPassword] = useState(false)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputBodySignUp((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Access the values from the state variable InputBodySignUp
        const {email, password, firstName, lastName, passwordConfirm} = InputBodySignUp;
        console.log(InputBodySignUp);

        // Perform any necessary validation or processing on the form data
        // ...

        try {
            // Make an API call using the fetch function
            await axios.post('http://localhost:5000/api/v1/users/signup', JSON.stringify(InputBodySignUp), {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                toast({
                    title: 'Sign up successful', status: 'success', duration: 900, position: 'top', isClosable: true,
                })
                navagate("/login")

            }).catch(e => {
                if (e.response.status == 400) {
                    toast({
                        title: e.response.data.message, status: 'error', duration: 900, position: 'top',

                        isClosable: true,
                    })
                }
            })


        } catch (error) {
            // Handle any network or other errors
            console.error(error);
        }

    };

    return (<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgGradient={"linear(to-r,#0083B0,#8732A5,#A81FA2,#DB009E)"}>
        <Stack direction={['column', 'row']} maxW={'lg'} bg={"white"} mx={"auto"} justify={'center'}
               borderRadius={"8px"} alignContent={"center"} >

            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
               >
                <Stack spacing={4} align={'center'}  w={"500px"} m={8}>
                    <form onSubmit={handleSubmit}>
                        <Stack >
                            <Heading fontSize={'4xl'} textAlign={'center'}>
                                SIGN UP
                            </Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                Wellcome to your website ✌️
                            </Text>
                            <Flex>
                                <Spacer></Spacer>
                                <Avatar size={"lg"} src={"logo.png"}></Avatar>
                                <Spacer></Spacer>

                            </Flex>
                        </Stack>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" name={"firstName"} onChange={handleInputChange}/>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" name={"lastName"} onChange={handleInputChange}/>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name={"email"} onChange={handleInputChange}/>
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
                        <FormControl id="passwordConfirm" isRequired>
                            <FormLabel>Password Confirm</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name={"passwordConfirm"}
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
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                type="submit"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'} onClick={() => {
                                navagate(-1)
                            }}>Login</Link>
                            </Text>
                        </Stack>
                    </form>
                </Stack>
            </Box>
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