import Header from "../../components/Common/Header";
import {Tabnav_profile} from "../../components/Tabnav_profile";
import {Box, Container, Flex, Spacer} from "@chakra-ui/react";
import CoverPicture from "../../components/Profile/CoverPicture";
import Sidebar from "../../components/Sidebar";
import ListFollowing from "../../components/ListFollowing";
import React from "react";

export function Profile_page() {
    return (


        <Box letterSpacing={2} bg={"#e9e9e9e9"} borderLeft={"10px"} fontFamily={"Segoe UI"}>
            <Header firstName={""} lastName={""} profilePic={""}/>

            <Flex letterSpacing={2}>


                <Sidebar/>


                <Container bg={"#ebebeb"} alignItems={"center"}>
                    <Flex alignContent={"center"}>
                        <CoverPicture></CoverPicture>
                            <Spacer></Spacer>
                    </Flex>


                    <Container alignContent={"center"}>

                        <Tabnav_profile></Tabnav_profile>

                    </Container>
                </Container>
                <ListFollowing></ListFollowing>


                {/*<Spacer  bg={"#ebebeb"} height={150}></Spacer>*/}


                {/*<ListFollowing></ListFollowing>*/}


            </Flex>
        </Box>

    );
}