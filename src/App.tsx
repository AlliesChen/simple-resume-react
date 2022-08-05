import React from "react";
import {
  ChakraProvider,
  Center,
  Heading,
  Container,
  Button,
} from "@chakra-ui/react";
import { GeneralInfo } from "./components/GeneralInfo";
import { EducationalExp } from "./components/EducationalExp";
import { PracticalExp } from "./components/PraticalExp";
import { storeData } from "./store";

function App() {
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const { generalInfo, educationExps, practicalExps } = storeData;
  function handleSubmit() {
    setIsSubmit(!isSubmit);
  }
  const EducationExps = Object.keys(educationExps).map((key) => (
    <EducationalExp
      key={key}
      submitState={isSubmit}
      storeValues={educationExps[key]}
    ></EducationalExp>
  ));

  const PracticalExps = Object.keys(practicalExps).map((key) => (
    <PracticalExp
      key={key}
      submitState={isSubmit}
      storeValues={practicalExps[key]}
    ></PracticalExp>
  ));

  return (
    <ChakraProvider>
      <Center m={4}>
        <Heading>My Simeple Resume</Heading>
      </Center>
      <Container maxW="4xl">
        <GeneralInfo
          submitState={isSubmit}
          storeValues={generalInfo}
        ></GeneralInfo>
        {EducationExps}
        {PracticalExps}
      </Container>
      <Button
        position="absolute"
        top="1"
        right="4"
        colorScheme={isSubmit ? "yellow" : "green"}
        onClick={handleSubmit}
      >
        {isSubmit ? "Edit" : "Submit"}
      </Button>
    </ChakraProvider>
  );
}

export default App;
