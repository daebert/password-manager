import {
  deleteCredentials,
  readCredentials,
  writeCredentials,
} from "./utils/credentials";
// import { printPassword } from "./utils/messages";
import {
  askForMainPassword,
  askForNewCredentials,
  chooseAction,
  chooseCommand,
  chooseService,
} from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";
import CryptoJS from "crypto-js";

const start = async () => {
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
        const credentials = await readCredentials();
        switch (action) {
          case "show":
            {
              const credentialServices = credentials.map(
                (credential) => credential.userService
              );
              const service = await chooseService(credentialServices);
              const selectedService = credentials.find(
                (credential) => credential.userService === service
              );
              if (selectedService) {
                selectedService.userPassword = CryptoJS.AES.decrypt(
                  selectedService.userPassword,
                  "passwordHash"
                ).toString(CryptoJS.enc.Utf8);
              }

              console.log(selectedService);

              // printPassword(service);
            }
            break;

          case "delete": {
            const credentialServices = credentials.map(
              (credential) => credential.userService
            );
            const service = await chooseService(credentialServices);
            const selectedService = credentials.find(
              (credential) => credential.userService === service
            );
            if (selectedService) {
              deleteCredentials(selectedService);

              console.log(`${service} is removed from list.`);
            }
          }
        }
      }
      break;
    case "add":
      {
        const newCredential = await askForNewCredentials();

        await writeCredentials(newCredential);
      }
      break;
  }
};
start();
