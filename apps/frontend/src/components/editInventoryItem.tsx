import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react"
import { MenuItem } from "../entities/menuitem"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useUpdateMenuItem } from "../hooks/menuitems"
import { useQueryClient } from "@tanstack/react-query"

type Props = {
  show: boolean
  menuItem: MenuItem
  onClose: () => void
  //   onSave: () => void
}

export default function EditInventoryItem({ show, menuItem, onClose }: Props) {
  const queryClient = useQueryClient()
  const mutation = useUpdateMenuItem()
  const toast = useToast()
  const btnRef = useRef<any>()
  const [updatedMenuItem, setUpdateMenuItem] = useState<MenuItem>({
    ...menuItem,
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setUpdateMenuItem(menuItem)
  }, [menuItem])

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0]
    setSelectedImage(file)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>, input: string) {
    const value = e.target.value
    if (input === "name") {
      setUpdateMenuItem((prev) => ({
        ...prev,
        name: value,
      }))
    }

    if (input === "price") {
      setUpdateMenuItem((prev) => ({
        ...prev,
        price: parseInt(value),
      }))
    }

    if (input === "quantity") {
      setUpdateMenuItem((prev) => ({
        ...prev,
        quantity: parseInt(value),
      }))
    }

    if (input === "description") {
      setUpdateMenuItem((prev) => ({
        ...prev,
        description: value,
      }))
    }
  }

  function handleSaveItemEdit() {
    if (!selectedImage) {
      setErrorMessage("select image")
      return
    } else {
      setErrorMessage(null)
    }
    mutation.mutate(
      { ...updatedMenuItem, image: selectedImage! },
      {
        onSuccess: () => {
          toast({
            title: "Update successful",
            status: "success",
          })
          queryClient.invalidateQueries({ queryKey: ["menuitems"] })
          onClose()
        },
        onError: (error) => {
          console.log(error)
          toast({
            title: "Failed to update",
            status: "error",
          })
        },
      }
    )
  }

  return (
    <Drawer
      isOpen={show}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent bg="black">
        <DrawerCloseButton />
        <DrawerHeader>Edit Item</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />

            <FormControl>
              <FormLabel color="#fff">Name</FormLabel>
              <Input
                name="name"
                value={updatedMenuItem.name}
                color="#green"
                borderColor="#fff"
                onChange={(e) => handleChange(e, "name")}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Description</FormLabel>
              <Input
                name="name"
                value={updatedMenuItem.description}
                color="#green"
                borderColor="#fff"
                onChange={(e) => handleChange(e, "description")}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Price</FormLabel>
              <Input
                name="name"
                value={updatedMenuItem.price}
                color="#green"
                borderColor="#fff"
                onChange={(e) => handleChange(e, "price")}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Quantity</FormLabel>
              <Input
                name="name"
                value={updatedMenuItem.quantity}
                color="#green"
                borderColor="#fff"
                onChange={(e) => handleChange(e, "quantity")}
              />
            </FormControl>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" bg="red" mr={3} onClick={onClose}>
            Delete
          </Button>
          <Button
            colorScheme="green"
            onClick={handleSaveItemEdit}
            disabled={errorMessage !== null}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
