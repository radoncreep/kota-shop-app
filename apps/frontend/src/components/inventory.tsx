import {
  Flex,
  Progress,
  Image,
  Box,
  Text,
  Card,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { useMenuItems } from "../hooks/menuitems"
import { useState } from "react"
import { EditInventoryItem } from "."
import { MenuItem } from "../entities/menuitem"

export default function InventoryItems() {
  const { data, isLoading } = useMenuItems()

  const [show, setShow] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)

  if (isLoading) {
    return <Progress isIndeterminate size="xs" />
  }

  if (!data && !isLoading) {
    return <Text>You have no existing menu items, create one!</Text>
  }

  function handleShowDrawer(item: MenuItem) {
    setShow((prev) => !prev)
    setEditItem(item)
  }

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={3} py={10}>
        {data?.map((item) => (
          <GridItem>
            <Card
              width="15rem"
              pb={4}
              bg="transparent"
              cursor="pointer"
              onClick={() => handleShowDrawer(item)}
            >
              <Image
                src="/images/kota_food1.jpg"
                fallback={<Box bgColor="orange" width="100%" height="10rem" />}
              />
              <Box p={2}>
                <Text color="#000" fontSize="24px" fontWeight="600">
                  {item.name}
                </Text>
                <Text color="gray.500" fontSize="14px" fontWeight="600">
                  {item.description}
                </Text>
                <Text color="gray.500" fontSize="14px" fontWeight="600">
                  Price: ${item.price}
                </Text>
                <Text color="gray.500" fontSize="14px" fontWeight="600">
                  current quantity: {item.quantity}
                </Text>
              </Box>
            </Card>
          </GridItem>
        ))}
      </Grid>
      {/* <Flex
        columnGap={10}
        width="100%"
        wrap="wrap"
        justifyContent="space-between"
        rowGap={10}
        py={10}
      >
        {data?.map((item) => (
          <Card
            width="15rem"
            pb={4}
            bg="transparent"
            cursor="pointer"
            onClick={() => handleShowDrawer(item)}
          >
            <Image
              src="/images/kota_food1.jpg"
              fallback={<Box bgColor="orange" width="100%" height="10rem" />}
            />
            <Box p={2}>
              <Text color="#000" fontSize="24px" fontWeight="600">
                {item.name}
              </Text>
              <Text color="gray.500" fontSize="14px" fontWeight="600">
                {item.description}
              </Text>
              <Text color="gray.500" fontSize="14px" fontWeight="600">
                Price: ${item.price}
              </Text>
              <Text color="gray.500" fontSize="14px" fontWeight="600">
                current quantity: {item.quantity}
              </Text>
            </Box>
          </Card>
        ))}
      </Flex> */}

      {editItem && (
        <EditInventoryItem
          show={show}
          onClose={() => setShow(false)}
          menuItem={editItem}
        />
      )}
    </>
  )
}
