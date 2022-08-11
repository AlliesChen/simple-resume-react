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
import {
  type PracticalExpInfoTemplate,
  type UserInfo,
  type UserInfoBlocks,
} from "../utils/store";
import {
  expContainerAttr,
  onEditExpContainerAttr,
} from "../styles/styleComponents";
import { DeleteExpButton } from "./DeleteExpButton";
import fp from "lodash";

interface Props {
  index: number;
  length: number;
  submitState: boolean;
  storeValues: PracticalExpInfoTemplate;
  setInputs: React.Dispatch<React.SetStateAction<PracticalExpInfoTemplate[]>>;
  setAppUserData: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export function PracticalExp(props: Props) {
  const BLOCK: UserInfoBlocks = "practicalExps";
  const [userInputs, setUserInputs] = React.useState({ ...props.storeValues });
  const { key, company, position, job, from, end } = userInputs;
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };

  function moveExp(step: 1 | -1) {
    new Promise((resolved) => {
      const newData = {};
      props.setAppUserData((prev) => {
        const newAppData = Object.assign(newData, prev);
        const blockIndex = newAppData[BLOCK].findIndex(
          (block) => block.key === key
        );
        const currentBlock = fp.remove(
          newAppData[BLOCK] as PracticalExpInfoTemplate[],
          (block) => block.key === key
        )[0];
        newAppData[BLOCK].splice(blockIndex + step, 0, currentBlock);
        return newAppData;
      });
      resolved(newData);
    }).then((newData) => {
      props.setInputs(Reflect.get(newData as UserInfo, BLOCK));
    });
  }

  useEffect(() => {
    const userInputPracticalExp: PracticalExpInfoTemplate = Object.assign(
      {},
      userInputs
    );
    props.setInputs((prev) =>
      prev.map((item: PracticalExpInfoTemplate) =>
        item.key === userInputPracticalExp.key ? userInputPracticalExp : item
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
        value={company}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="position">Position Title</FormLabel>
      <Input
        variant="flushed"
        id="position"
        type="text"
        isDisabled={props.submitState ? true : false}
        value={position}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="job">Job Description</FormLabel>
      <Textarea
        placeholder="main tasks of your job"
        id="job"
        isDisabled={props.submitState ? true : false}
        value={job}
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
            onClick={() => moveExp(-1)}
            disabled={props.index === 0}
          />
          <IconButton
            aria-label="Delete education block"
            icon={<ArrowDownIcon />}
            onClick={() => moveExp(1)}
            disabled={props.index === props.length - 1}
          />
          <Spacer />
          <DeleteExpButton
            block="practicalExps"
            blockKey={key}
            setInputs={props.setInputs}
            setAppUserData={props.setAppUserData}
          ></DeleteExpButton>
        </Flex>
      )}
    </Container>
  );
}
