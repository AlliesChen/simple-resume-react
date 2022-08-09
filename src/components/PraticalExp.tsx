import React, { useEffect } from "react";
import {
  Container,
  FormLabel,
  Input,
  Flex,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { type PracticalExpInfoTemplate } from "../store";
interface Props {
  submitState: boolean;
  storeValues: PracticalExpInfoTemplate;
  submitInputs: (obj: PracticalExpInfoTemplate) => PracticalExpInfoTemplate[];
}
export function PracticalExp(props: Props) {
  const [userInputs, setUserInputs] = React.useState({ ...props.storeValues });
  const { index, company, position, job, from, end } = props.storeValues;
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const userInputPracticalExp: PracticalExpInfoTemplate = Object.assign(
      {},
      userInputs,
      { index }
    );
    props.submitInputs(userInputPracticalExp);
  }, [props.submitState]);

  return (
    <Container m={12} maxW="3xl">
      <FormLabel htmlFor="school">Company Name</FormLabel>
      <Input
        variant="flushed"
        id="company"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={userInputs.company ? userInputs.company : company}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="position">Position Title</FormLabel>
      <Input
        variant="flushed"
        id="position"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={userInputs.position ? userInputs.position : position}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="job">Job Description</FormLabel>
      <Textarea
        placeholder="main tasks of your job"
        id="job"
        isDisabled={props.submitState ? true : false}
        value={userInputs.job ? userInputs.job : job}
        onChange={handleInputChange}
      />
      <Flex gap={8}>
        <Box flexGrow="1">
          <FormLabel htmlFor="from">From</FormLabel>
          <Input
            variant="flushed"
            id="from"
            type="date"
            isDisabled={props.submitState ? true : false}
            value={userInputs.from ? userInputs.from : from}
            onChange={handleInputChange}
          />
        </Box>
        <Box flexGrow="1">
          <FormLabel htmlFor="end">End</FormLabel>
          <Input
            variant="flushed"
            id="end"
            type="date"
            isDisabled={props.submitState ? true : false}
            value={userInputs.end ? userInputs.end : end}
            onChange={handleInputChange}
          />
        </Box>
      </Flex>
    </Container>
  );
}
