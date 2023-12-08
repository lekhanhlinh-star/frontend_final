import {
    Avatar,
    Box,
    Breadcrumb, BreadcrumbLink,
    Flex,
    Heading,
    HStack, IconButton,
    Input,
    Spacer,
    Tooltip,
    useColorModeValue, WrapItem
} from "@chakra-ui/react";


export const Body_Chat = () => {
    const mess = [{
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "User",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "bot",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "User",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "User",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "User",
    }, {
        content: "Hello", sender: "User",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "User",
    },];

    return (
        <Box bg="#ffffff" overflow="auto" overflowY="auto" >

            <Flex direction="column" >
                {mess.map((message, index) => (<Box

                    key={index}
                    bg={message.sender === "User" ? "#0a7cff" : "#f0f0f0"}
                    borderRadius={message.sender === "User" ? "20px 20px 20px 0" : "8px 8px 0 8px"}
                    padding="8px"
                    mx={7}
                    marginBottom="8px"
                    alignSelf={message.sender === "User" ? "flex-end" : "flex-start"}
                    maxW="45%"
                >
                    {/* <Text color={"black"} fontSize={"15px"}>{message.content}</Text> */}
                </Box>))}
            </Flex>
        </Box>
    );
};