import { Box, Flex, Text } from "@chakra-ui/layout"
import { MenuItemInventory, SideNavbar } from "../components"
import {
  Button,
  Center,
  HStack,
  Image,
  Progress,
  VStack,
} from "@chakra-ui/react"
import { DashboardOverview, Overview } from "../lib/dashboard-overview"
import CreateNewMenuItem from "../components/createNewItem"

export default function DashboardPage() {
  return (
    <Flex justifyContent="space-between">
      <SideNavbar />

      <Flex
        direction="column"
        alignItems="center"
        my="4rem"
        minWidth="70%"
        bg="#fff"
        mx="auto"
        py={10}
        px={10}
      >
        <Flex alignItems="center" columnGap={10}>
          {DashboardOverview.map((data, index) => {
            return <DashboardCard key={index} {...data} />
          })}
        </Flex>

        <CreateNewMenuItem />

        {/* <Box > */}
        <MenuItemInventory />
        {/* </Box> */}
      </Flex>
    </Flex>
  )
}

type Data = Overview

function DashboardCard(props: Data) {
  return (
    <Center px={4} py={10} borderRadius="lg" boxShadow="md" maxH="10rem">
      <Flex justifyContent="space-between" columnGap={4} alignItems="center">
        <Image src={props.iconPath} width="80px" height="80px" />

        <VStack align="left" spacing={1}>
          <Text color="#000" fontSize={40} fontWeight="800" lineHeight={1}>
            {props.value}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {props.name}
          </Text>
        </VStack>
      </Flex>
    </Center>
  )
}
