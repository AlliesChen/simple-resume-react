import React from "react";
import {
  Container,
  Box,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
export function GeneralInfo() {
  const [userInputs, setUserInputs] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => (setInput: (prevValue: object) => {newValue: object}) => {
    const {id, value} = e.target;
    setInput(prev => {
      return {...prev, [id]: value}
    });
  }
  return (
    <Container m={12} maxW="3xl">
      <Flex gap={8}>
        <Box flexGrow="1">
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input variant="flushed" id="firstName" type="text" onChange={handleInputChange} />
        </Box>
        <Box flexGrow="1">
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input variant="flushed" id="lastName" type="text" onChange={handleInputChange}/>
        </Box>
      </Flex>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input variant="flushed" id="email" type="email" onChange={handleInputChange}/>
      <FormLabel htmlFor="phone">Phone Number</FormLabel>
      <Input variant="flushed" id="phone" type="text" onChange={handleInputChange}/>
    </Container>
  );
}
