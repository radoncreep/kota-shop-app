import { Box, Heading, VStack, Text, Button } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const sideRoutes = ["Dashboard"]

export default function SideNavbar() {
  const navigate = useNavigate()
  function handleLogout() {
    Cookies.remove("Authorization")
    navigate("/login", { replace: true })
  }
  return (
    <Box bgColor="#fff" minH="100vh" width="20rem" p={2}>
      <VStack align="center" width="100%" spacing={1} my={2}>
        <Heading size="lg" color="#000">
          Kota Shop
        </Heading>

        <Text fontSize="sm" fontWeight="700" color="gray.400">
          Admin Dashboard
        </Text>
      </VStack>

      <VStack align="center" px={6} spacing={6} py={12}>
        {sideRoutes.map((route, index) => (
          <Button
            key={`$${route}-${index}`}
            // leftIcon={<}
            // variant="ghost"
            color="#000"
            _hover={{
              bgColor: "green.200",
            }}
            bgColor="orange.200"
            width="8rem"
          >
            {route}
          </Button>
        ))}

        <Box>
          <Button
            width="8rem"
            bgColor="red"
            onClick={handleLogout}
            _hover={{ bgColor: "none" }}
          >
            Logout
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
