import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbLink,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton, Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer, Tooltip, useColorMode, useColorModeValue,
    WrapItem,
} from "@chakra-ui/react";
import {
    AddIcon,
    BellIcon,
    ChatIcon,
    DragHandleIcon,
    EditIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    RepeatIcon,
    Search2Icon,
    SettingsIcon
} from "@chakra-ui/icons";
import React, {useState} from 'react';
import DrawerExample from "../MessageDrawer"
interface ProfileInfo {
    firstName:string|undefined
    lastName: string|undefined
    profilePic: string|undefined



}
// 'https://bit.ly/dan-abramov'
function Header(props:ProfileInfo ) {
    console.log(props)


    const [searchString, setSearchString] = useState("")
     const { colorMode, toggleColorMode } = useColorMode()

    return (

        <Box as={"nav"} py={3}   position={"sticky"} top={0}
             bgGradient={  useColorModeValue(  "linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")}
             zIndex={999}>
            <Flex justify="space-between" align="center" maxW="1400px" mx="auto" color={"white"}>



                <Avatar as={"a"} href={"/"} src={"logo.png"}></Avatar>
                    <Input ml={"5"} width={"250px"} placeholder='Search...' bg={"white"} color={"black"}
                       value={searchString}
                       onChange={(e) => setSearchString(e.target.value)}    borderRadius={40}
                />

                <Spacer/>
                 <Spacer/>

                <Heading as="h2" size="lg" fontFamily="Helvetica">
                    LTL social media
                </Heading>


                <Spacer/>
                <Spacer/>

                <HStack>
                    <Breadcrumb spacing='10px' >







                        <DrawerExample/>
                        <Tooltip hasArrow label='Notification' bg='gray.300' color='white'>
                        <IconButton icon={<BellIcon fontSize={"45px"} color={"white"} />} mx={2} isRound={true} variant={"ghost"} colorScheme='#000000' aria-label='Done'
                                    size={"lg"}>
                            <BreadcrumbLink href='#'></BreadcrumbLink>
                        </IconButton>
                            </Tooltip>


                    </Breadcrumb>

                </HStack>

                <WrapItem paddingX={3}>
                    <Avatar  as={"a"} h={"75px"}  w={"65px"} href='/profile' name={props.firstName} src={"${host_server}/uploads/"+props.profilePic}/>
                </WrapItem>
                <IconButton aria-label={"setting"} icon={<SettingsIcon/>} colorScheme='gray.550'  isRound={true}   onClick={toggleColorMode} >
                     <BreadcrumbLink href='/profile'></BreadcrumbLink>

                </IconButton>
            </Flex>
        </Box>
    );
}

export default Header;