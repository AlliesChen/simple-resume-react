import React from "react";
import { Container, Box, FormLabel, Input, Flex } from "@chakra-ui/react";
import { type UserInfo } from "../store";
interface Props {
  submitState: boolean;
  storeValues: UserInfo["generalInfo"];
}
export function GeneralInfo(props: Props) {
  const [userInputs, setUserInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const { firstName, lastName, email, phone } = props.storeValues;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <Container m={12} maxW="3xl">
      <Flex gap={8}>
        <Box flexGrow="1">
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            variant="flushed"
            id="firstName"
            type="text"
            value={userInputs.firstName ? userInputs.firstName : firstName}
            isDisabled={props.submitState ? true : false}
            onChange={handleInputChange}
          />
        </Box>
        <Box flexGrow="1">
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            variant="flushed"
            id="lastName"
            type="text"
            value={userInputs.lastName ? userInputs.lastName : lastName}
            isDisabled={props.submitState ? true : false}
            onChange={handleInputChange}
          />
        </Box>
      </Flex>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input
        variant="flushed"
        id="email"
        type="email"
        value={userInputs.email ? userInputs.email : email}
        isDisabled={props.submitState ? true : false}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="phone">Phone Number</FormLabel>
      <Input
        variant="flushed"
        id="phone"
        type="text"
        value={userInputs.phone ? userInputs.phone : phone}
        isDisabled={props.submitState ? true : false}
        onChange={handleInputChange}
      />
    </Container>
  );
}
