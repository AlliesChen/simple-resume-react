import React from "react";
import {
  Container,
  FormLabel,
  Input,
  Flex,
  Box
} from "@chakra-ui/react";
export function EducationalExp() {
  return (
    <Container m={12} maxW="3xl">
      <FormLabel htmlFor="school">School Name</FormLabel>
      <Input variant="flushed" id="school" type="text" />
      <FormLabel htmlFor="study">Title of Study</FormLabel>
      <Input variant="flushed" id="study" type="text" />
      <Flex gap={8}>
        <Box flexGrow="1">
          <FormLabel htmlFor="from">From</FormLabel>
          <Input variant="flushed" id="from" type="date" />
        </Box>
        <Box flexGrow="1">
          <FormLabel htmlFor="to">To</FormLabel>
          <Input variant="flushed" id="to" type="date" />
        </Box>
      </Flex>
    </Container>
  );
}
