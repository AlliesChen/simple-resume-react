import { info } from "console";
import fp from "lodash";
import { ParsedUrlQueryInput } from "querystring";
import { GeneralInfo } from "./components/GeneralInfo";

const _generalInfoTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const _educationalExpTemplate = {
  school: "",
  study: "",
  from: "",
  end: "",
};

const _praticalExpTemplate = {
  company: "",
  position: "",
  job: "",
  from: "",
  end: "",
};

type EducationExpInfo = typeof _educationalExpTemplate;

type PracticalExpInfo = typeof _praticalExpTemplate;

interface UserInfo {
  generalInfo: typeof _generalInfoTemplate;
  educationExps: { [index: string]: EducationExpInfo };
  practicalExps: { [index: string]: PracticalExpInfo };
}

const _initialData: UserInfo = {
  generalInfo: Object.assign({}, _generalInfoTemplate),
  educationExps: { 1: Object.assign({}, _educationalExpTemplate) },
  practicalExps: { 1: Object.assign({}, _praticalExpTemplate) },
};

const getLocalData = () => localStorage.getItem("userData");

function initStore(): UserInfo {
  localStorage.setItem("userData", JSON.stringify(_initialData));
  const json = getLocalData();
  try {
    const hasLocalValidData: boolean = !!(
      json && fp.isEqual(JSON.parse(json), _initialData)
    );
    return hasLocalValidData
      ? JSON.parse(json as string)
      : Object.assign({}, _initialData);
  } catch (err: unknown) {
    throw new Error("Incorrect initial data format: " + err);
  }
}

const storeData = (function () {
  const json = getLocalData();
  if (json) {
    const storageData: UserInfo = JSON.parse(json);
    console.log("Resume stored data");
    return storageData;
  }
  console.log("Init data");
  return initStore();
})();

export {
  storeData,
  type EducationExpInfo,
  type PracticalExpInfo,
  type UserInfo,
};
