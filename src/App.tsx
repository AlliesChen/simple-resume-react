import React from "react";
import { ChakraProvider, Center, Heading } from "@chakra-ui/react";
import { GeneralInfo } from "./components/GeneralInfo";
import { EducationalExp } from "./components/EducationalExp"

function App() {
  return (
    <ChakraProvider>
      <Center m={4}>
        <Heading>My Simeple Resume</Heading>
      </Center>
        <GeneralInfo></GeneralInfo>
        <EducationalExp></EducationalExp>
    </ChakraProvider>
  );
}

export default App;
