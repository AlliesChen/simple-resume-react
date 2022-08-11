import React, { useEffect } from "react";
import fp from "lodash";
import {
  ChakraProvider,
  Center,
  Heading,
  Container,
  Button,
  Box,
  Link,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { GeneralInfo } from "./components/GeneralInfo";
import { EducationalExp } from "./components/EducationalExp";
import { PracticalExp } from "./components/PraticalExp";
import { AppendExpButton } from "./components/AppendExpButton";
import {
  StoreData,
  type GeneralInfoTemplate,
  type EducationExpInfoTemplate,
  type PracticalExpInfoTemplate,
  type UserInfo,
} from "./store";
import GitHubIcon from "./assets/GitHub-Mark-64px.png";

function App() {
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<UserInfo>(StoreData.get());
  const { generalInfo, educationExps, practicalExps } = userData;
  const [userInputGeneralInfo, setUserInputGeneralInfo] =
    React.useState<GeneralInfoTemplate>({ ...generalInfo });
  const [userInputEducationExps, setUserInputEducationExps] = React.useState<
    EducationExpInfoTemplate[]
  >([...educationExps]);
  const [userInputPracticalExps, setUserInputPracticalExps] = React.useState<
    PracticalExpInfoTemplate[]
  >([...practicalExps]);

  const EducationExps = educationExps.map(info => {
    return (
    <EducationalExp
      key={info.key}
      submitState={isSubmit}
      storeValues={info}
      setInputs={setUserInputEducationExps}
      setAppUserData={setUserData}
    ></EducationalExp>
  )
});

  const PracticalExps = practicalExps.map(info => {
    return (
      <PracticalExp
        key={info.key}
        submitState={isSubmit}
        storeValues={info}
        setInputs={setUserInputPracticalExps}
        setAppUserData={setUserData}
      ></PracticalExp>
    );
  });

  useEffect(() => {
    if (isSubmit) {
      const userInputData = {
        generalInfo: Object.assign({}, generalInfo, userInputGeneralInfo),
        educationExps: fp.cloneDeep(userInputEducationExps),
        practicalExps: fp.cloneDeep(userInputPracticalExps),
      };
      StoreData.set(userInputData);
      setUserData(StoreData.get());
    }
  }, [
    isSubmit,
    fp.isEqual(userInputGeneralInfo, generalInfo),
    fp.isEqual(userInputEducationExps, educationExps),
    fp.isEqual(userInputPracticalExps, practicalExps),
  ]);

  return (
    <ChakraProvider>
      <Center m={4}>
        <Heading>My Simeple Resume</Heading>
      </Center>
      <Container maxW="4xl">
        <GeneralInfo
          submitState={isSubmit}
          storeValues={generalInfo}
          submitInputs={setUserInputGeneralInfo}
        ></GeneralInfo>
        {EducationExps}
        {isSubmit === false && (
          <AppendExpButton
            template="EducationExp"
            setInputs={setUserInputEducationExps}
            setAppUserData={setUserData}
          >
            + Add New Education Experience
          </AppendExpButton>
        )}
        {PracticalExps}
        {isSubmit === false && (
          <AppendExpButton
            template="PracticalExp"
            setInputs={setUserInputPracticalExps}
            setAppUserData={setUserData}
          >
            + Add New Work Experience
          </AppendExpButton>
        )}
      </Container>
      <Button
        position="absolute"
        top="1"
        right="4"
        colorScheme={isSubmit ? "yellow" : "green"}
        onClick={() => setIsSubmit(!isSubmit)}
      >
        {isSubmit ? "Edit" : "Submit"}
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="2"
        bg="teal"
        color="teal.100"
      >
        <Link
          href="https://github.com/AlliesChen/simple-resume-react"
          isExternal
        >
          <Flex>
            <Image boxSize="24px" src={GitHubIcon} alt="github icon"></Image>
            <Text ml={1}>AlliesChen@GitHub</Text>
          </Flex>
        </Link>
      </Box>
    </ChakraProvider>
  );
}

export default App;
