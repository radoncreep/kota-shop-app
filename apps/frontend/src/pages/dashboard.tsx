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

      <Flex direction="column" alignItems="center" my="4rem" flexGrow={1}>
        <Flex alignItems="center" columnGap={10}>
          {DashboardOverview.map((data, index) => {
            return <DashboardCard key={index} {...data} />
          })}
        </Flex>

        <CreateNewMenuItem />

        <Box width="70%" py={10}>
          <MenuItemInventory />
        </Box>
      </Flex>
    </Flex>
  )
}

type Data = Overview

function DashboardCard(props: Data) {
  return (
    <Center bgColor="#fff" px={14} py={10} borderRadius="lg" boxShadow="md">
      <HStack spacing={4}>
        <Image src={props.iconPath} boxSize={12} />

        <VStack align="left" spacing={1}>
          <Text color="#000" fontSize={50} fontWeight="800" lineHeight={1}>
            {props.value}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {props.name}
          </Text>
        </VStack>
      </HStack>
    </Center>
  )
}
