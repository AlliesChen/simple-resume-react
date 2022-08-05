import React from "react";
import { ChakraProvider, Center, Heading } from "@chakra-ui/react";
import { GeneralInfo } from "./components/GeneralInfo";
import { EducationalExp } from "./components/EducationalExp"
import { PracticalExp } from "./components/PraticalExp";

function App() {
  return (
    <ChakraProvider>
      <Center m={4}>
        <Heading>My Simeple Resume</Heading>
      </Center>
        <GeneralInfo></GeneralInfo>
        <EducationalExp></EducationalExp>
        <PracticalExp></PracticalExp>
    </ChakraProvider>
  );
}

export default App;
