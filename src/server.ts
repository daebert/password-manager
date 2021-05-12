import { readCredentials } from "./utils/credentials";
import { printPassword } from "./utils/messages";
import {
  askForMainPassword,
  askForNewCredentials,
  chooseCommand,
  chooseService,
} from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";

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
        const credentials = await readCredentials();
        const credentialServices = credentials.map(
          (credential) => credential.userService
        );
        const service = await chooseService(credentialServices);
        const selectedService = credentials.find(
          (credential) => credential.userService === service
        );

        console.log(selectedService);

        printPassword(service);
      }
      break;
    case "add":
      {
        const newCredential = await askForNewCredentials();
        console.log(newCredential);
      }
      break;
  }
};
start();
