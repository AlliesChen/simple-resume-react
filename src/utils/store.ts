import fp from "lodash";
import { nanoid } from "nanoid";

const _generalInfoTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const _educationalExpTemplate = {
  key: nanoid(),
  school: "",
  study: "",
  from: "",
  end: "",
};

const _praticalExpTemplate = {
  key: nanoid(),
  company: "",
  position: "",
  job: "",
  from: "",
  end: "",
};

type GeneralInfoTemplate = typeof _generalInfoTemplate;
type EducationExpInfoTemplate = typeof _educationalExpTemplate;
type PracticalExpInfoTemplate = typeof _praticalExpTemplate;
type UserInputs =
  | GeneralInfoTemplate
  | EducationExpInfoTemplate
  | PracticalExpInfoTemplate;

interface UserInfo {
  generalInfo: GeneralInfoTemplate;
  educationExps: Array<EducationExpInfoTemplate>;
  practicalExps: Array<PracticalExpInfoTemplate>;
}
type UserInfoBlocks = Exclude<keyof UserInfo, "generalInfo">;

const _initialData: UserInfo = {
  generalInfo: Object.assign({}, _generalInfoTemplate),
  educationExps: new Array(fp.cloneDeep(_educationalExpTemplate)),
  practicalExps: new Array(fp.cloneDeep(_praticalExpTemplate)),
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

function isValidInfoFormat(inputs: UserInputs, template: UserInputs) {
  if (typeof inputs === "object") {
    let isValid = true;
    for (const [key, value] of Object.entries(inputs)) {
      if (
        template.hasOwnProperty(key) &&
        typeof value === typeof template[key as keyof UserInputs]
      )
        continue;
      else {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
  return false;
}

const StoreData = (function () {
  function get() {
    const json = getLocalData();
    if (json) {
      const storageData: UserInfo = JSON.parse(json);
      console.log("Resume stored data");
      return storageData;
    }
    console.log("Init data");
    return initStore();
  }

  function set(data: UserInfo): UserInfo | undefined {
    try {
      const { generalInfo, educationExps, practicalExps } = data;
      if (
        fp.isEqualWith(generalInfo, _generalInfoTemplate, isValidInfoFormat) &&
        educationExps.every((item) =>
          fp.isEqualWith(item, _educationalExpTemplate, isValidInfoFormat)
        ) &&
        practicalExps.every((item) =>
          fp.isEqualWith(item, _praticalExpTemplate, isValidInfoFormat)
        )
      ) {
        const newStoreData: UserInfo = {
          generalInfo: Object.assign({}, generalInfo),
          educationExps: fp.cloneDeep(educationExps),
          practicalExps: fp.cloneDeep(practicalExps),
        };
        localStorage.setItem("userData", JSON.stringify(newStoreData));
        return newStoreData;
      }
      throw new Error("Incorrect data format");
    } catch (err) {
      console.error("Unable to store data: " + err);
    }
  }

  function getEducationExpTemplate() {
    const newKey = { key: nanoid() };
    const newExp: EducationExpInfoTemplate = Object.assign(
      {},
      _educationalExpTemplate,
      newKey
    );
    return newExp;
  }

  function getPracticalExpTemplate() {
    const newKey = { key: nanoid() };
    const newExp: PracticalExpInfoTemplate = Object.assign(
      {},
      _praticalExpTemplate,
      newKey
    );
    return newExp;
  }

  return { get, set, getEducationExpTemplate, getPracticalExpTemplate };
})();

export {
  StoreData,
  type GeneralInfoTemplate,
  type EducationExpInfoTemplate,
  type PracticalExpInfoTemplate,
  type UserInfo,
  type UserInfoBlocks,
};
