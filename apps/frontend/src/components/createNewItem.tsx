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
  Text,
} from "@chakra-ui/react"
import { ChangeEvent, useRef, useState } from "react"
import { CreateMenuItem } from "../api/menuitems"
import { useCreateMenuItem } from "../hooks/menuitems"
import { useQueryClient } from "@tanstack/react-query"

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
  const queryClient = useQueryClient()

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
        setSelectedImage(null)
      },
      onError: (error) => {
        toast({
          title: "Failed to create",
          description: error.message,
          status: "error",
        })
        setSelectedImage(null)
      },
    })
  }

  return (
    <Box mt={10} width="100%">
      <Box width="100%">
        <Button
          borderRadius="md"
          onClick={handleShowCreateView}
          bgColor="orange.300"
          _hover={{
            bgColor: "none",
          }}
          size="lg"
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
          <DrawerContent bg="gray.50">
            <DrawerCloseButton />
            <DrawerHeader>Create Item</DrawerHeader>

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
                  {selectedImage && (
                    <Text color="#000">{selectedImage.name}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel color="#000">Name</FormLabel>
                  <Input
                    name="name"
                    ref={nameInputRef}
                    // value={updatedMenuItem.name}
                    color="#000"
                    borderColor="#000"
                    onChange={(e) => handleChange(e, "name")}
                    _hover={{
                      borderColor: "none",
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#000">Description</FormLabel>
                  <Input
                    name="description"
                    ref={descriptionInputRef}
                    color="#000"
                    borderColor="#000"
                    onChange={(e) => handleChange(e, "description")}
                    _hover={{
                      borderColor: "none",
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#000">Price</FormLabel>
                  <Input
                    ref={priceInputRef}
                    name="price"
                    color="#000"
                    borderColor="#000"
                    onChange={(e) => handleChange(e, "price")}
                    _hover={{
                      borderColor: "none",
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#000">Quantity</FormLabel>
                  <Input
                    ref={quantityInputRef}
                    name="quantity"
                    // value={updatedMenuItem.quantity}
                    color="#000"
                    borderColor="#000"
                    onChange={(e) => handleChange(e, "quantity")}
                    _hover={{
                      borderColor: "none",
                    }}
                  />
                </FormControl>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" bg="red" mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                bgColor="orange.400"
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
