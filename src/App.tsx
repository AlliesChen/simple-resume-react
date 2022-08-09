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
import { AppendExpButton } from "./components/AppendExpButton";
import {
  StoreData,
  type GeneralInfoTemplate,
  type EducationExpInfoTemplate,
  type PracticalExpInfoTemplate,
  type UserInfo,
} from "./store";

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
  const submitEducationExpsInputs = (
    userInputs: EducationExpInfoTemplate
  ): EducationExpInfoTemplate[] => {
    setUserInputEducationExps((prev) =>
      prev.map((item: EducationExpInfoTemplate) =>
        item.index === userInputs.index ? userInputs : item
      )
    );
    return userInputEducationExps;
  };
  const submitPracticalExpsInputs = (
    userInputs: PracticalExpInfoTemplate
  ): PracticalExpInfoTemplate[] => {
    setUserInputPracticalExps((prev) =>
      prev.map((item: PracticalExpInfoTemplate) =>
        item.index === userInputs.index ? userInputs : item
      )
    );
    return userInputPracticalExps;
  };
  const EducationExps = educationExps.map((info, index) => (
    <EducationalExp
      key={index}
      submitState={isSubmit}
      storeValues={info}
      submitInputs={submitEducationExpsInputs}
    ></EducationalExp>
  ));

  const PracticalExps = practicalExps.map((info, index) => (
    <PracticalExp
      key={index}
      submitState={isSubmit}
      storeValues={info}
      submitInputs={submitPracticalExpsInputs}
    ></PracticalExp>
  ));

  useEffect(() => {
    if (isSubmit) {
      const userInputData = {
        generalInfo: Object.assign(generalInfo, userInputGeneralInfo),
        educationExps: Object.assign(
          educationExps,
          fp.cloneDeep(userInputEducationExps)
        ),
        practicalExps: Object.assign(
          practicalExps,
          fp.cloneDeep(userInputPracticalExps)
        ),
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
          <AppendExpButton setAppUserData={setUserData} template="EducationExp">
            + Add New Education Experience
          </AppendExpButton>
        )}
        {PracticalExps}
        {isSubmit === false && (
          <AppendExpButton setAppUserData={setUserData} template="PracticalExp">
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
    </ChakraProvider>
  );
}

export default App;
