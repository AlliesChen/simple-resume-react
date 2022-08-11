import React, { useEffect } from "react";
import {
  Container,
  FormLabel,
  Input,
  Flex,
  Box,
  Textarea,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { type PracticalExpInfoTemplate, type UserInfo } from "../store";
import {
  expContainerAttr,
  onEditExpContainerAttr,
} from "../styles/styleComponents";
import { DeleteExpButton } from "./DeleteExpButton";

interface Props {
  submitState: boolean;
  storeValues: PracticalExpInfoTemplate;
  setInputs: React.Dispatch<React.SetStateAction<PracticalExpInfoTemplate[]>>;
  setAppUserData: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export function PracticalExp(props: Props) {
  const [userInputs, setUserInputs] = React.useState({ ...props.storeValues });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const userInputPracticalExp: PracticalExpInfoTemplate = Object.assign(
      {},
      userInputs
    );
    console.log(JSON.stringify(userInputPracticalExp));
    props.setInputs((prev) =>
      prev.map((item: PracticalExpInfoTemplate) =>
        item.key === userInputPracticalExp.key
          ? userInputPracticalExp
          : item
      )
    );
  }, [props.submitState]);

  return (
    <Container
      position="relative"
      {...(props.submitState ? expContainerAttr : onEditExpContainerAttr)}
    >
      <FormLabel htmlFor="school">Company Name</FormLabel>
      <Input
        variant="flushed"
        id="company"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={userInputs.company}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="position">Position Title</FormLabel>
      <Input
        variant="flushed"
        id="position"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={userInputs.position}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="job">Job Description</FormLabel>
      <Textarea
        placeholder="main tasks of your job"
        id="job"
        isDisabled={props.submitState ? true : false}
        value={userInputs.job}
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
            value={userInputs.from}
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
            value={userInputs.end}
            onChange={handleInputChange}
          />
        </Box>
      </Flex>
      {props.submitState === false && (
        <Flex
          position="absolute"
          top="2"
          right="-12"
          h="90%"
          flexDirection="column"
          gap="4"
        >
          <IconButton
            aria-label="Delete education block"
            icon={<ArrowUpIcon />}
          />
          <IconButton
            aria-label="Delete education block"
            icon={<ArrowDownIcon />}
          />
          <Spacer />
          <DeleteExpButton
            block="practicalExps"
            setInputs={props.setInputs}
            setAppUserData={props.setAppUserData}
          ></DeleteExpButton>
        </Flex>
      )}
    </Container>
  );
}
