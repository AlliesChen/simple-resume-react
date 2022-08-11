import React from "react";
import {
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { type UserInfo } from "../store";

type UserInfoKeys = Exclude<keyof UserInfo, "generalInfo">;

interface Props<T> {
  block: UserInfoKeys;
  blockIndex: number;
  setInputs: React.Dispatch<React.SetStateAction<T>>;
  setAppUserData: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export function DeleteExpButton<T extends UserInfo[UserInfoKeys]>(
  props: Props<T>
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  function mutateExps(arr: T): void {
    arr.splice(props.blockIndex, 1)
    let i = 0;
    for (const item of arr) {
      item.index = i;
      i += 1;
    }
    console.log("After mutateExps: ");  
    console.log(JSON.stringify(arr))
  }

  function deleteExpBlock() {
    new Promise(resolved => {
      const newData = {}
      props.setAppUserData((prev) => {
        const newAppData = Object.assign(newData, prev);
        mutateExps(newAppData[props.block] as T)
        return newAppData
      });
      resolved(newData);
    }).then(newData => {
      props.setInputs(Reflect.get(newData as UserInfo, props.block));
    })
    onClose()
  }

  return (
    <>
      <IconButton
        colorScheme="red"
        aria-label="Delete education block"
        icon={<DeleteIcon />}
        onClick={onOpen}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete block?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={deleteExpBlock}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
