import React from "react";
import {
  Container,
  Box,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
export function GeneralInfo() {
  return (
    <Container m={12} maxW="3xl">
      <Flex gap={8}>
        <Box flexGrow="1">
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input variant="flushed" id="firstName" type="text" />
        </Box>
        <Box flexGrow="1">
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input variant="flushed" id="lastName" type="text" />
        </Box>
      </Flex>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input variant="flushed" id="email" type="email" />
      <FormLabel htmlFor="phone">Phone Number</FormLabel>
      <Input variant="flushed" id="phone" type="text" />
    </Container>
  );
}
