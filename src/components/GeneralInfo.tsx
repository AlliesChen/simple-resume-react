import React, {useEffect} from "react";
import { Container, Box, FormLabel, Input, Flex } from "@chakra-ui/react";
import { type GeneralInfoTemplate } from "../store";
import { expContainerAttr, onEditExpContainerAttr } from "../styles/styleComponents"

interface Props {
  submitState: boolean,
  storeValues: GeneralInfoTemplate,
  submitInputs: React.Dispatch<React.SetStateAction<GeneralInfoTemplate>>,
}
export function GeneralInfo(props: Props) {
  const [userInputs, setUserInputs] = React.useState({...props.storeValues});
  const { firstName, lastName, email, phone } = userInputs;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };
  useEffect(() => {
    props.submitInputs(prev => Object.assign(prev, userInputs));
  }, [props.submitState])

  return (
    <Container {...props.submitState ? expContainerAttr : onEditExpContainerAttr}>
      <Flex gap={8}>
        <Box flexGrow="1">
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            variant="flushed"
            id="firstName"
            type="text"
            value={firstName}
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
            value={lastName}
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
        value={email}
        isDisabled={props.submitState ? true : false}
        onChange={handleInputChange}
      />
      <FormLabel htmlFor="phone">Phone Number</FormLabel>
      <Input
        variant="flushed"
        id="phone"
        type="text"
        value={phone}
        isDisabled={props.submitState ? true : false}
        onChange={handleInputChange}
      />
    </Container>
  );
}
