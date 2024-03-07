import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react"
import { ChangeEvent, useRef, useState } from "react"
import { CreateMenuItem } from "../api/menuitems"
import { useCreateMenuItem } from "../hooks/menuitems"
import { QueryClient } from "@tanstack/react-query"

export default function CreateNewMenuItem() {
  const [show, setShow] = useState(false)

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const descriptionInputRef = useRef<HTMLInputElement | null>(null)
  const priceInputRef = useRef<HTMLInputElement | null>(null)
  const quantityInputRef = useRef<HTMLInputElement | null>(null)

  const btnRef = useRef<any>()
  const toast = useToast()
  const queryClient = new QueryClient()

  const mutation = useCreateMenuItem()

  function handleShowCreateView() {
    setShow(true)
  }

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0]
    setSelectedImage(file)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>, input: string) {
    const value = e.target.value
    console.log({ value })
    if (input === "name" && nameInputRef?.current) {
      nameInputRef.current.value = value
    }

    if (input === "price" && priceInputRef?.current) {
      priceInputRef.current.value = value
    }
    if (input === "quantity" && quantityInputRef?.current) {
      quantityInputRef.current.value = value
    }

    if (input === "description" && descriptionInputRef?.current) {
      descriptionInputRef.current.value = value
    }
  }

  function handleClose() {
    setShow(false)
  }

  function handleSubmit() {
    const name = nameInputRef?.current?.value
    const description = descriptionInputRef?.current?.value
    const price = priceInputRef?.current?.value
    const quantity = quantityInputRef?.current?.value

    if (!name || !description || !price || !quantity || !selectedImage) {
      setErrorMessage("Invalid input")
      return
    }

    const newItem: CreateMenuItem = {
      image: selectedImage,
      name,
      quantity: parseInt(quantity),
      price: parseInt(quantity),
      description,
    }
    mutation.mutate(newItem, {
      onSuccess: () => {
        toast({
          title: "Created New Item",
          status: "success",
        })
        queryClient.invalidateQueries({ queryKey: ["menuitems"] })
        handleClose()
      },
      onError: (error) => {
        toast({
          title: "Failed to create",
          description: error.message,
          status: "error",
        })
      },
    })
  }

  return (
    <Box mt={10} width="70%">
      <Box width="100%">
        <Button
          borderRadius="md"
          onClick={handleShowCreateView}
          bgColor="orange.300"
          _hover={{
            bgColor: "none",
          }}
        >
          Add New Menu Item
        </Button>
      </Box>

      {show && (
        <Drawer
          isOpen={show}
          placement="right"
          onClose={handleClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg="black">
            <DrawerCloseButton />
            <DrawerHeader>Create Item</DrawerHeader>

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
                    ref={nameInputRef}
                    // value={updatedMenuItem.name}
                    color="#fff"
                    borderColor="#fff"
                    onChange={(e) => handleChange(e, "name")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#fff">Description</FormLabel>
                  <Input
                    name="description"
                    ref={descriptionInputRef}
                    // value={updatedMenuItem.description}
                    color="#fff"
                    borderColor="#fff"
                    onChange={(e) => handleChange(e, "description")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#fff">Price</FormLabel>
                  <Input
                    ref={priceInputRef}
                    name="price"
                    // value={updatedMenuItem.price}
                    color="#fff"
                    borderColor="#fff"
                    onChange={(e) => handleChange(e, "price")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#fff">Quantity</FormLabel>
                  <Input
                    ref={quantityInputRef}
                    name="quantity"
                    // value={updatedMenuItem.quantity}
                    color="#fff"
                    borderColor="#fff"
                    onChange={(e) => handleChange(e, "quantity")}
                  />
                </FormControl>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" bg="red" mr={3} onClick={handleClose}>
                Delete
              </Button>
              <Button
                colorScheme="green"
                onClick={handleSubmit}
                disabled={errorMessage !== null}
              >
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  )
}
