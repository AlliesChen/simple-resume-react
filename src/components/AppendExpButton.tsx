import { Center, Button } from "@chakra-ui/react";
import { StoreData, type UserInfo, type UserInfoBlocks } from "../utils/store";
import fp from "lodash";

type TemplateGetter = Extract<
  keyof typeof StoreData,
  "getEducationExpTemplate" | "getPracticalExpTemplate"
>;
interface Props<T> {
  children: string;
  template: "EducationExp" | "PracticalExp";
  setInputs: React.Dispatch<React.SetStateAction<T>>;
  setAppUserData: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export function AppendExpButton<T extends UserInfo[UserInfoBlocks]>(
  props: Props<T>
) {
  function appendExpBlock() {
    const cb: TemplateGetter = `get${props.template}Template`;
    const newBlock = StoreData[cb]();
    const dataKey = props.template[0]
      .toLowerCase()
      .concat(props.template.slice(1), "s") as UserInfoBlocks;

    /** Appending data that only affects the screen */
    props.setAppUserData((prev) => {
      const newAppData = Object.assign({}, prev);
      newAppData[dataKey][newAppData[dataKey].length] = newBlock;
      return newAppData;
    });
    /** Appending data to user inputs which will store it */
    props.setInputs((prev) => {
      const newInputData = fp.cloneDeep(prev);
      newInputData[newInputData.length] = newBlock;
      return newInputData;
    });
  }
  return (
    <Center my={6}>
      <Button
        width="3xl"
        colorScheme="teal"
        variant="outline"
        onClick={appendExpBlock}
      >
        {props.children}
      </Button>
    </Center>
  );
}
