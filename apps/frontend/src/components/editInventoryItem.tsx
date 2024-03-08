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
  Text,
} from "@chakra-ui/react"
import { MenuItem } from "../entities/menuitem"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useDeleteMenuItem, useUpdateMenuItem } from "../hooks/menuitems"
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
  const deleteMutation = useDeleteMenuItem()
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
          toast({
            title: "Failed to update",
            description: error.message,
            status: "error",
          })
        },
      }
    )
  }

  function handleDelete(menuItemId: MenuItem["iD"]) {
    deleteMutation.mutate(menuItemId, {
      onSuccess: () => {
        toast({
          title: "Item deleted",
          status: "success",
        })
        onClose()
      },
      onError: () => {
        toast({
          title: "Failed to delete item",
          status: "error",
        })
      },
    })
  }

  return (
    <Drawer
      isOpen={show}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent bg="gray.50">
        <DrawerCloseButton color="#000" />
        <DrawerHeader>Edit Item</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color="#000">Select Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                px={0}
                _hover={{
                  borderColor: "none",
                }}
              />
              {selectedImage && <Text color="#000">{selectedImage.name}</Text>}
            </FormControl>

            <FormControl>
              <FormLabel color="#fff">Name</FormLabel>
              <Input
                name="name"
                value={updatedMenuItem.name}
                color="#000"
                borderColor="#000"
                onChange={(e) => handleChange(e, "name")}
                _hover={{
                  borderColor: "#000",
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Description</FormLabel>
              <Input
                name="description"
                value={updatedMenuItem.description}
                color="#000"
                borderColor="#000"
                onChange={(e) => handleChange(e, "description")}
                _hover={{
                  borderColor: "#000",
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Price</FormLabel>
              <Input
                name="price"
                value={updatedMenuItem.price}
                color="#000"
                borderColor="#000"
                onChange={(e) => handleChange(e, "price")}
                _hover={{
                  borderColor: "#000",
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Quantity</FormLabel>
              <Input
                name="quantity"
                value={updatedMenuItem.quantity}
                color="#000"
                borderColor="#000"
                onChange={(e) => handleChange(e, "quantity")}
                _hover={{
                  borderColor: "#000",
                }}
              />
            </FormControl>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            isLoading={deleteMutation.isPending}
            variant="outline"
            bg="red"
            mr={3}
            onClick={() => handleDelete(menuItem.iD)}
          >
            Delete
          </Button>
          <Button
            bgColor="orange.400"
            onClick={handleSaveItemEdit}
            disabled={errorMessage !== null}
          >
            Edit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
