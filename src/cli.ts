import dotenv from "dotenv";

import {
  deleteCredential,
  saveCredential,
  selectCredential,
} from "./utils/credentials";
import {
  askForMainPassword,
  askForNewCredentials,
  chooseAction,
  chooseCommand,
} from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";
import CryptoJS from "crypto-js";
import { connectDatabase, disconnectDatabase } from "./utils/database";

dotenv.config();

const start = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new Error("Missing env MONGO_URL");
  }
  await connectDatabase(process.env.MONGO_URL);

  let mainPassword = await askForMainPassword();
  while (!(await isMainPasswordValid(mainPassword))) {
    console.log("Is invalid");
    mainPassword = await askForMainPassword();
  }
  console.log("Is valid");

  const command = await chooseCommand();

  switch (command) {
    case "list":
      {
        const action = await chooseAction();
        switch (action) {
          case "show":
            {
              const selectedCredential = await selectCredential();
              if (selectedCredential) {
                selectedCredential.userPassword = CryptoJS.AES.decrypt(
                  selectedCredential.userPassword,
                  "passwordHash"
                ).toString(CryptoJS.enc.Utf8);
              }

              console.log(selectedCredential);
            }
            break;
          case "delete": {
            const selectedCredential = await selectCredential();
            if (selectedCredential) {
              await deleteCredential(selectedCredential.userService);
              console.log("Service removed from list.");
            }
          }
        }
      }
      break;
    case "add":
      {
        const newCredential = await askForNewCredentials();
        await saveCredential(newCredential);
      }
      break;
  }
  await disconnectDatabase();
};
start();
