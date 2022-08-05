import React from "react";
import {
  Container,
  FormLabel,
  Input,
  Flex,
  Box,
  Textarea
} from "@chakra-ui/react";
export function PracticalExp() {
  return (
    <Container m={12} maxW="3xl">
      <FormLabel htmlFor="school">Company Name</FormLabel>
      <Input variant="flushed" id="company" type="text" />
      <FormLabel htmlFor="study">Position Title</FormLabel>
      <Input variant="flushed" id="study" type="text" />
      <FormLabel htmlFor="study">Job Description</FormLabel>
      <Textarea placeholder="main tasks of your job" />
      <Flex gap={8}>
        <Box flexGrow="1">
          <FormLabel htmlFor="from">From</FormLabel>
          <Input variant="flushed" id="from" type="date" />
        </Box>
        <Box flexGrow="1">
          <FormLabel htmlFor="to">End</FormLabel>
          <Input variant="flushed" id="to" type="date" />
        </Box>
      </Flex>
    </Container>
  );
}
