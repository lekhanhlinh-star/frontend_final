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

const LinkItems: Array<LinkItemProps> =
    [{name: '', icon: FiHome, link: "/"}, {name: '', icon: CgProfile, link: "/profile"}, {name: '', icon: FaFacebookMessenger, link: "/message"}, {name: '', icon: FiCompass, link: "/explore"},]


export default function Message_bar() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (<Box    maxWidth={"100px"}

                   minW={"100px"} bg={"rgba(0,0,0,0.91)"} border="2px solid #d9d9d9d9">
        <SidebarContent onClose={() => onClose} display={{base: 'none', md: 'block'}}/>
        <Drawer
            // mt={10}
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            >
            <DrawerContent mt={100}>
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

            // borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}

            pos="fixed"
            h="full"
            // size="full"

            {...rest}>


            {LinkItems.map((link) => (<NavItem key={link.name} icon={link.icon} link={link.link}>
                {link.name}
            </NavItem>))}


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
                bg: "#290048", color: 'white', bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
            }}
            {...rest}>
            {icon && (<Icon
                mr="4"
                color={"rgba(255,255,255,0.85)"}
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

