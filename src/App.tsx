import React, { useEffect } from "react";
import fp from "lodash";
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
import { StoreData, type GeneralInfoTemplate, type UserInfo } from "./store";

function App() {
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<UserInfo>(StoreData.get())
  const { generalInfo, educationExps, practicalExps } = userData;
  const [userInputGeneralInfo, setUserInputGeneralInfo] = React.useState<GeneralInfoTemplate>({...generalInfo});
  const [userInputEducationExps, setUserInputEducationExps] = React.useState<UserInfo['educationExps']>({...educationExps});
  const [userInputPracticalExps, setUserInputPracticalExps] = React.useState<UserInfo['practicalExps']>({...practicalExps});
  const EducationExps = educationExps.map((info, index) => (
    <EducationalExp
      key={index}
      submitState={isSubmit}
      storeValues={info}
    ></EducationalExp>
  ));

  const PracticalExps = practicalExps.map((info, index) => (
    <PracticalExp
      key={index}
      submitState={isSubmit}
      storeValues={info}
    ></PracticalExp>
  ));
  
  useEffect(() => {
    console.log('App useEffect triggered');
    const userInputData = {
      generalInfo: Object.assign(generalInfo, userInputGeneralInfo),
      educationExps: Object.assign(educationExps, fp.cloneDeep(userInputEducationExps)),
      practicalExps: Object.assign(practicalExps, fp.cloneDeep(userInputPracticalExps)),
    }
    console.log(generalInfo);
    console.log(fp.cloneDeep(userInputGeneralInfo));
    StoreData.set(userInputData)
    setUserData(StoreData.get());
  }, [isSubmit, userInputGeneralInfo])

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
        {PracticalExps}
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
    </ChakraProvider>
  );
}

export default App;
