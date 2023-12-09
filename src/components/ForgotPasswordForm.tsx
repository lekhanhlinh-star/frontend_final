'use client'

import {
    Avatar,
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import React, {useState} from "react";

export default function ForgotPasswordForm() {
    const toast = useToast()
    const navigate = useNavigate();

    const [email, setEmail] = useState({
        "email": "",
    });
    const host_server=process.env.REACT_APP_SERVER_API_URL
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setEmail((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log("onSubmit")


            axios.post(`${host_server}/api/v1/users/forgotPass`, JSON.stringify(email), {
                headers: {
                    'Content-Type': 'application/json', // 'authorization': `Bearer ${token}`,
                },
            }).then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    toast({
                        title: 'Send email successful',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position: 'top',
                    })

                }
            }).catch(error => {
                console.log(error);


                toast({
                    title: error.response.data.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })

            });


        } catch (e) {
            console.log(e)
        }
    }

    return (<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgGradient={"linear(to-r,#0083B0,#8732A5,#A81FA2,#DB009E)"}>
        <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            minW={300}
            minH={300}

            my={12}>
            <Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}>
                Forgot your password?
            </Heading>
            <Flex>
                <Spacer></Spacer>
                <Avatar size={"lg"} src={"logo.png"}></Avatar>
                <Spacer></Spacer>

            </Flex>
            <Text
                fontSize={{base: 'sm', sm: 'md'}}
                color={useColorModeValue('gray.800', 'gray.400')}>
                You&apos;ll get an email with a reset link
            </Text>
            <form onSubmit={handleSubmit}>
                <FormControl id="email">
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{color: 'gray.500'}}
                        type="email"
                        name={"email"}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        mt={7}
                        type={"submit"}>
                        Request Reset
                    </Button>
                </Stack>
            </form>
        </Stack>
    </Flex>)
}