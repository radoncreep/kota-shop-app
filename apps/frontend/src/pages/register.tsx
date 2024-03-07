import { Container, Heading } from "@chakra-ui/layout"
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react"
import { ChangeEvent, useRef, useState } from "react"
import { useRegister } from "../hooks/auth"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const { mutate } = useRegister()
  const toast = useToast()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  const firstNameInputRef = useRef<HTMLInputElement | null>(null)
  const lastNameInputRef = useRef<HTMLInputElement | null>(null)

  function handleShowPassword() {
    setShowPassword((prev) => !prev)
  }

  function handleOnChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    if (emailInputRef?.current) {
      emailInputRef.current.value = e.target.value
    }
  }

  function handleOnChangePassword(e: ChangeEvent<HTMLInputElement>) {
    if (passwordInputRef?.current) {
      passwordInputRef.current.value = e.target.value
    }
  }

  function handleOnChangeFirstName(e: ChangeEvent<HTMLInputElement>) {
    if (firstNameInputRef?.current) {
      firstNameInputRef.current.value = e.target.value
    }
  }

  function handleOnChangeLastName(e: ChangeEvent<HTMLInputElement>) {
    if (lastNameInputRef?.current) {
      lastNameInputRef.current.value = e.target.value
    }
  }

  function handleSubmit() {
    const email = emailInputRef ? emailInputRef.current?.value ?? "" : ""
    const password = passwordInputRef
      ? passwordInputRef.current?.value ?? ""
      : ""
    const firstname = firstNameInputRef
      ? firstNameInputRef.current?.value ?? ""
      : ""
    const lastname = lastNameInputRef
      ? lastNameInputRef.current?.value ?? ""
      : ""

    mutate(
      {
        email,
        password,
        firstname,
        lastname,
      },
      {
        onSuccess: () => {
          console.log("success")
          toast({
            title: "Login successful",
            position: "top-right",
            status: "success",
          })
          navigate("../login", { replace: true })
        },
        onError: (err) => {
          toast({
            title: "Failed to login",
            description: err.message,
            position: "top-right",
            status: "error",
          })
        },
      }
    )
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Container my="auto" p={10} borderRadius="md" boxShadow="md">
        <Heading size="md" color="#000" mb={10}>
          Register an account
        </Heading>

        <VStack align="left" spacing={10}>
          <FormControl>
            <FormLabel color="#000">First name</FormLabel>
            <Input
              ref={firstNameInputRef}
              type="email"
              placeholder="example@example.com"
              onChange={handleOnChangeFirstName}
              color="#000"
              borderColor="#000"
              _hover={{
                borderColor: "#000",
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#000">Last name</FormLabel>
            <Input
              ref={lastNameInputRef}
              type="email"
              placeholder="example@example.com"
              onChange={handleOnChangeLastName}
              color="#000"
              borderColor="#000"
              _hover={{
                borderColor: "#000",
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#000">Email address</FormLabel>
            <Input
              ref={emailInputRef}
              type="email"
              placeholder="example@example.com"
              onChange={handleOnChangeEmail}
              color="#000"
              borderColor="#000"
              _hover={{
                borderColor: "#000",
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Password</FormLabel>
            <InputGroup size="md">
              <Input
                ref={passwordInputRef}
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={handleOnChangePassword}
                color="#000"
                borderColor="#000"
                _hover={{
                  borderColor: "#000",
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            size="md"
            bgColor="orange.300"
            color="#fff"
            fontWeight="500"
            fontSize="md"
            _hover={{
              bgColor: "orange.500",
            }}
            onClick={handleSubmit}
          >
            Register
          </Button>

          <Box mt={2} alignSelf="flex-end">
            <Link to={"/login"}>
              <Text textDecoration="underline" color="black">
                Login
              </Text>
            </Link>
          </Box>
        </VStack>
      </Container>
    </Flex>
  )
}
