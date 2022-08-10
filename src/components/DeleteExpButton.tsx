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
import fp from "lodash";

type UserInfoKeys = Exclude<keyof UserInfo, "generalInfo">;
interface Props {
  template: "EducationExp" | "PracticalExp",
  blockIndex: number,
  setInputs: React.Dispatch<React.SetStateAction<UserInfo[UserInfoKeys]>>,
}

export function DeleteExpButton(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  function deleteExpBlock() {
    props.setInputs(prev => {
      const newData = fp.cloneDeep(prev);
      newData.splice(props.blockIndex, 1);
      let i = 0;
      for (const item of newData) {
        item.index = i;
        i += 1;
      }
      console.log(newData);
      return newData
    });
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
