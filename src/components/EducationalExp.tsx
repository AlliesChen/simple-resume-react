import React from "react";
import { Container, FormLabel, Input, Flex, Box } from "@chakra-ui/react";
import { type EducationExpInfo } from "../store";
interface Props {
  submitState: boolean;
  storeValues: EducationExpInfo;
}
export function EducationalExp(props: Props) {
  const [userInputs, setUserInputs] = React.useState({
    school: "",
    study: "",
    from: "",
    end: "",
  });
  const { school, study, from, end } = props.storeValues;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <Container m={12} maxW="3xl">
      <FormLabel htmlFor="school">School Name</FormLabel>
      <Input
        variant="flushed"
        id="school"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={userInputs.school ? userInputs.school : school}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="study">Title of Study</FormLabel>
      <Input
        variant="flushed"
        id="study"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={userInputs.study ? userInputs.study : study}
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
