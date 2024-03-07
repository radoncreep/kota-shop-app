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
} from "@chakra-ui/react"
import { ChangeEvent, useRef, useState } from "react"
import { useLogin } from "../hooks/auth"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const { mutate } = useLogin()
  const toast = useToast()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)

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

  function handleSubmit() {
    const email = emailInputRef ? emailInputRef.current?.value ?? "" : ""
    const password = passwordInputRef
      ? passwordInputRef.current?.value ?? ""
      : ""

    mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log("success")
          toast({
            title: "Login successful",
            position: "top-right",
            status: "success",
          })
          navigate("../", { replace: true })
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
          Login to Account
        </Heading>

        <VStack align="left" spacing={10}>
          <FormControl>
            <FormLabel color="#000">Email address</FormLabel>
            <Input
              ref={emailInputRef}
              type="email"
              placeholder="example@example.com"
              onChange={handleOnChangeEmail}
              color="#000"
              borderColor="#000"
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
            bgColor="green.300"
            color="#fff"
            fontWeight="500"
            fontSize="md"
            _hover={{
              bgColor: "green.500",
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </VStack>
      </Container>
    </Flex>
  )
}
