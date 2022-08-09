import { Center, Button } from "@chakra-ui/react";
import { StoreData, type UserInfo } from "../store";

interface Props {
  children: string;
  template: "EducationExp" | "PracticalExp";
  setAppUserData: React.Dispatch<React.SetStateAction<UserInfo>>;
}

type TemplateGetter = Extract<
  keyof typeof StoreData,
  "getEducationExpTemplate" | "getPracticalExpTemplate"
>;
type UserInfoKeys = Exclude<keyof UserInfo, "generalInfo">;

export function AppendExpButton(props: Props) {
  function appendExpBlock() {
    const cb: TemplateGetter = `get${props.template}Template`;
    const newBlock = StoreData[cb]();
    const newData = StoreData.get();
    const dataKey = props.template[0]
      .toLowerCase()
      .concat(props.template.slice(1), "s") as UserInfoKeys;
    newData[dataKey][newData[dataKey].length] = newBlock;
    props.setAppUserData(newData);
  }
  return (
    <Center>
      <Button width="3xl" colorScheme="teal" variant="outline" onClick={appendExpBlock}>
        {props.children}
      </Button>
    </Center>
  );
}
