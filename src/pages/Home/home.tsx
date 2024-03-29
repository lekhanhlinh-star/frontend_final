import Header from "../../components/Common/Header"
import {MainScreen} from "../../components/MainScreen";
import {Box, Center, Container, Flex, Grid, GridItem, Square, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";



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
export function Home_page() {


    const [profileinfo, setProfileinfo] = useState<ProfileInfo | undefined>(undefined);

     useEffect(() => {
         console.log("use Effect")
        const token = localStorage.getItem("token");
        // Create a separate function for fetching data
    const host_server=process.env.REACT_APP_SERVER_API_URL
         
        const fetchProfileInfo = async () => {

               await axios.get(`${host_server}/api/v1/users/me`, {
                    headers: {
                        "authorization": `Bearer ${token}`,
                    },
                }).then(response => {
                        const dataUser: ProfileInfo = response.data.data.doc;
                            console.log( "àasfasfsafasfasfsa",response)
                            setProfileinfo(dataUser)

                   }).catch(error => {
                       console.log(error)
               })


        };

        // Call the fetch function
        fetchProfileInfo();
    }, []);
    return (
        <>

            <Box letterSpacing={2} bg={"#e9e9e9e9"} borderLeft={"10px"} fontFamily={"Segoe UI"} >
                <Header lastName={"Linh"} firstName={"Le"}
                                    profilePic={profileinfo?.profilePic.filename}/>



            <MainScreen lastName={"Linh"} firstName={"Le"}
                                    profilePic={profileinfo?.profilePic.filename} />

            </Box>



        </>

    );
}
