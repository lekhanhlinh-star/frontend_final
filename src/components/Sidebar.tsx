'use client'

import React, {ReactText} from 'react'
import {
    Box,
    BoxProps,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    Icon,
    IconButton,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import {FiCompass, FiHome, FiMenu,} from 'react-icons/fi'
import {HiOutlineLogout} from "react-icons/hi";
import {IconType} from 'react-icons'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {CgProfile} from "react-icons/cg";
import {FaFacebookMessenger} from "react-icons/fa";

interface LinkItemProps {
    name: string
    icon: IconType
    link: string
}

const LinkItems: Array<LinkItemProps> = [{name: 'Home', icon: FiHome, link: "/"}, {name: 'Profile', icon: CgProfile, link: "/profile"}, {name: 'Message', icon: FaFacebookMessenger, link: "/message"}, {name: 'Explore', icon: FiCompass, link: "/explore"},]


export default function Sidebar() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (<Box minH="100vh" bg={"#e9e9e9e9"} border="2px solid #d9d9d9d9">
        <SidebarContent onClose={() => onClose} display={{base: 'none', md: 'block'}}/>
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full">
            <DrawerContent>
                <SidebarContent onClose={onClose}/>
            </DrawerContent>
        </Drawer>
        {/* mobilenav */}

        <Box ml={{base: 0, md: 60}}>

        </Box>
    </Box>)
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    const navigate = useNavigate()
    const toast = useToast()

    const handelLogout = async () => {
        await axios.post("http://localhost:5000/api/v1/users/logout").then(res => {
            console.log(res)
            localStorage.removeItem('token');
            toast({
                title: 'Logout successful', status: 'success', duration: 9000, isClosable: true, position: 'top',
            })


            navigate("/login")

        }).catch(e => {
            console.log(e)
        })
    }
    return (<Box
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            size="full"

            {...rest}>


            {LinkItems.map((link) => (<NavItem key={link.name} icon={link.icon} link={link.link}>
                {link.name}
            </NavItem>))}
            <Box
                as="a"
                // href={"/profile"}
                style={{textDecoration: 'none'}}
                _focus={{boxShadow: 'none'}}>

                <Flex
                    onClick={

                        handelLogout}
                    align="center"
                    p="4"
                    mx="4"
                    fontSize={"15px"}
                    as={"b"}
                    mt={3}
                    borderRadius="lg"
                    role="group"
                    color={"rgb(9,0,0)"}

                    cursor="pointer"
                    _hover={{
                        color: 'white', bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
                    }}>

                    <Icon


                        mr="4"
                        fontSize="35px"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={HiOutlineLogout}
                    />

                    <Text>
                        Logout

                    </Text>
                </Flex>


            </Box>

        </Box>

    )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    link: string
    children: ReactText
}

const NavItem = ({icon, link, children, ...rest}: NavItemProps) => {

    return (<Box
        as="a"
        href={link}
        style={{textDecoration: 'none'}}
        _focus={{boxShadow: 'none'}}>
        <Flex
            align="center"
            p="4"
            mx="4"
            mt={3}
            borderRadius="lg"
            fontSize={"15px"}
            as={"b"}
            role="group"
            cursor="pointer"
            _hover={{
                bg: "rgb(215,36,141)", color: 'white', bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
            }}
            {...rest}>
            {icon && (<Icon
                mr="4"
                color={"rgba(2,0,17,0.85)"}
                fontSize="35px"
                _groupHover={{
                    color: 'white',
                }}
                as={icon}
            />)}
            {children}
        </Flex>
    </Box>)
}

interface MobileProps extends FlexProps {
    onOpen: () => void
}

const MobileNav = ({onOpen, ...rest}: MobileProps) => {
    return (<Flex
        ml={{base: 0, md: 60}}
        px={{base: 4, md: 24}}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent="flex-start"
        {...rest}>
        <IconButton
            variant="outline"
            onClick={onOpen}
            aria-label="open menu"
            icon={<FiMenu/>}
        />


    </Flex>)
}