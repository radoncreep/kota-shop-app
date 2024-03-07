import { Box, Heading, VStack, Text, Button } from "@chakra-ui/react";

const sideRoutes = ["Dashboard", "Menu", "Orders"]

export default function SideNavbar() {

    return (
        <Box bgColor="#fff" minH="100vh" width="15rem" p={2}>
            <VStack align="center" width="100%" spacing={1} my={2}>
                <Heading size="lg" color="#000">
                    Kota Shop
                </Heading>

                <Text fontSize="sm" fontWeight="700" color="gray.200">Admin Dashboard</Text>
            </VStack>

            <VStack align="left" px={10} spacing={6}>
                {sideRoutes.map((route, index) => (
                    <Button 
                        key={`$${route}-${index}`}
                        // leftIcon={<}
                        // variant="ghost"
                        color="#000"
                        _hover={{
                            bgColor: "green.200"
                        }}
                        // bgColor="orange"
                    >
                        {route}
                    </Button>
                ))}
            </VStack>   
        </Box>
    )
}