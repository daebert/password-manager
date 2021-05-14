import fs from "fs/promises";
import type { Credential } from "../types";
import CryptoJS from "crypto-js";

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile("./db.json", "utf-8");
  const data: DB = JSON.parse(response);
  return data.credentials;
};

export const writeCredentials = async (
  newCredential: Credential
): Promise<void> => {
  newCredential.userPassword = CryptoJS.AES.encrypt(
    newCredential.userPassword,
    "passwordHash"
  ).toString();

  const listCredentials = await readCredentials();
  listCredentials.push(newCredential);

  await fs.writeFile(
    "./db.json",
    JSON.stringify({ credentials: listCredentials }, null, 2),
    "utf-8"
  );
};

export const deleteCredentials = async (
  selectedService: Credential
): Promise<void> => {
  const allCredentials = await readCredentials();
  const filteredCredentials = allCredentials.filter(
    (credential) => credential.userService != selectedService.userService
  );
  console.log(filteredCredentials);
  await fs.writeFile(
    "./db.json",
    JSON.stringify({ credentials: filteredCredentials }, null, 2),
    "utf-8"
  );
};
