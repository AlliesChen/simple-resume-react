import React, { useEffect } from "react";
import {
  Container,
  FormLabel,
  Input,
  Flex,
  Box,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { type EducationExpInfoTemplate, type UserInfo } from "../store";
import {
  expContainerAttr,
  onEditExpContainerAttr,
} from "../styles/styleComponents";
import { DeleteExpButton } from "./DeleteExpButton"

interface Props {
  submitState: boolean;
  storeValues: EducationExpInfoTemplate;
  setInputs: React.Dispatch<
    React.SetStateAction<EducationExpInfoTemplate[]>
  >;
  setAppUserData: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export function EducationalExp(props: Props) {
  const [userInputs, setUserInputs] = React.useState({ ...props.storeValues });
  const { school, study, from, end } = userInputs;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };

  // function ascendExp() {
  //   const newArr = 
  // }

  useEffect(() => {
    const userInputEducationExp: EducationExpInfoTemplate = Object.assign(
      {},
      userInputs
    );
    props.setInputs((prev) =>
      prev.map((item: EducationExpInfoTemplate) =>
        item.key === userInputEducationExp.key
          ? userInputEducationExp
          : item
      )
    );
  }, [props.submitState]);

  return (
    <Container
      position="relative"
      {...(props.submitState ? expContainerAttr : onEditExpContainerAttr)}
    >
      <FormLabel htmlFor="school">School Name</FormLabel>
      <Input
        variant="flushed"
        id="school"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={school}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="study">Title of Study</FormLabel>
      <Input
        variant="flushed"
        id="study"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={study}
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
            value={from}
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
            value={end}
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
            block="educationExps"
            setInputs={props.setInputs}
            setAppUserData={props.setAppUserData}
          ></DeleteExpButton>
        </Flex>
      )}
    </Container>
  );
}
