import type { Credential } from "../types";
import CryptoJS from "crypto-js";
import { getCredentialsCollection } from "./database";
// import { chooseService } from "./questions";

export const saveCredential = async (
  newCredential: Credential
): Promise<void> => {
  newCredential.userPassword = CryptoJS.AES.encrypt(
    newCredential.userPassword,
    "passwordHash"
  ).toString();
  await getCredentialsCollection().insertOne(newCredential);
};

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection()
    .find()
    .sort({ userService: 1 })
    .toArray();
};

export const deleteCredential = async (userService: string): Promise<void> => {
  await getCredentialsCollection().deleteOne({ userService: userService });
};

// export async function selectCredential(): Promise<Credential> {
//   const credentials = await readCredentials();
//   const credentialServices = credentials.map(
//     (credential) => credential.userService
//   );
//   const service = await chooseService(credentialServices);
//   const selectedCredential = credentials.find(
//     (credential) => credential.userService === service
//   );
//   if (!selectedCredential) {
//     throw new Error("Cannot find credential");
//   }
//   return selectedCredential;
// }
