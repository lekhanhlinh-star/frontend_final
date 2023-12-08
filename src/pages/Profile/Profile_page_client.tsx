import Header from "../../components/Common/Header";
import {Box, Container, Flex, Heading, Image, Text} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";

import CoverPicClient from "../../components/Profile_Client/CoverPicClient";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { WarningTwoIcon } from '@chakra-ui/icons'
import NotFound from "../NotFound/NotFound"
import ListFollowing from "../../components/ListFollowing";
import {Formpost} from "../../components/Formpost";
import Post from "../../components/Post";
interface ProfileInfo {
    firstName: string;
    lastName: string;
    profilePic: { filename: string | undefined };
    coverPhoto: { filename: string | undefined };
    role: string;
    likes: any[]; // Update the type based on your actual data structure
    retweets: any[]; // Update the type based on your actual data structure
    followers: any[]; // Update the type based on your actual data structure

}


export const Profile_page_client = () => {


    const id = useParams()
    const [profileinfo, setProfileinfo] = useState<ProfileInfo | undefined>(undefined);
    const [loadTrue, setLoadTrue] = useState(true)
    console.log(id)


    useEffect(() => {
        const token = localStorage.getItem("token");
        // Create a separate function for fetching data
        const fetchProfileInfo = async () => {

            await axios.get("http://localhost:5000/api/v1/users/" + id.id, {
                headers: {
                    "authorization": `Bearer ${token}`,
                },
            }).then(response => {
                const dataUser: ProfileInfo = response.data.data.doc;
                setProfileinfo(dataUser);

            }).catch(error => {
                setLoadTrue(!loadTrue)

            })
        };

        // Call the fetch function
        fetchProfileInfo();
    }, []);
    return (<>



        {loadTrue ? (<Box  letterSpacing={2}>
            <Header firstName={""} lastName={""} profilePic={""} />

            <Flex letterSpacing={2} bg={"#e9e9e9e9"}
                overflow={"hidden"}>
                <Sidebar />

                <Container bg={"#e9e9e9e9"}  width={"1000px"} >

                <CoverPicClient id={id.id} lastName={profileinfo?.firstName} firstName={profileinfo?.lastName} coverPhoto={profileinfo?.coverPhoto.filename}
                    profilePic={profileinfo?.profilePic.filename}></CoverPicClient>
                </Container>
                <ListFollowing />
            </Flex>


            <ListFollowing></ListFollowing>

        </Box>) :
            (
                <NotFound></NotFound>
            )


        }
    </>);
};