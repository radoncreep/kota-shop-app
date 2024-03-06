import { Box, Flex, Text } from "@chakra-ui/layout";
import { MenuItemInventory, SideNavbar } from "../components";
import { Center, HStack, Image, VStack } from "@chakra-ui/react";
import { DashboardOverview, Overview } from "../lib/dashboard-overview";

export default function DashboardPage() {
  return (
    <Flex justifyContent="space-between">
      <SideNavbar />

      <Box flexGrow={1} p={10}>
        <Box height="6rem" />

        <Flex alignItems="center" columnGap={10}>
          {DashboardOverview.map((data, index) => {
            return <DashboardCard key={index} {...data} />;
          })}
        </Flex>

        <Box width="70%" py={10}>
          <MenuItemInventory />
        </Box>
      </Box>
    </Flex>
  );
}

type Data = Overview;

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
  );
}
