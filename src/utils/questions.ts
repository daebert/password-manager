import inquirer from "inquirer";
import { Command } from "../types";
import { Credential } from "../types";

// export function askForMainPassword(): Promise<string> {
export const askForMainPassword = (): Promise<string> => {
  return inquirer
    .prompt<{ mainPassword: string }>([
      {
        type: "password",
        name: "mainPassword",
        message: "Enter main password （⊙ｏ⊙)",
      },
    ])
    .then((answers) => answers.mainPassword);
};

export const chooseCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>({
    type: "list",
    name: "command",
    message: "What do you want to do?",
    choices: [
      { name: "List all credentials", value: "list" },
      { name: "Add new credential", value: "add" },
    ],
  });
  return answers.command;
};

export const chooseService = async (services: string[]): Promise<string> => {
  const answers = await inquirer.prompt<{ service: string }>({
    type: "list",

    name: "service",
    message: "Please choose a service",
    choices: services,
  });
  return answers.service;
};

// export const askForNewCredentials = async (): Promise<string> => {
//   const chooseService = await inquirer.prompt<{ userService: string }>([
//     {
//       type: "input",
//       name: "userService",
//       message: "Please choose the service",
//     },
//   ]);

//   const chooseUsername = await inquirer.prompt<{ userName: string }>([
//     {
//       type: "input",
//       name: "userName",
//       message: "Please enter your username",
//     },
//   ]);
//   const choosePassword = await inquirer.prompt<{ userPassword: string }>([
//     {
//       type: "password",
//       name: "userPassword",
//       message: "Please enter your password",
//       mask: [],
//     },
//   ]);

//   return (
//     chooseService.userService,
//     chooseUsername.userName,
//     choosePassword.userPassword
//   );
// };

export const askForNewCredentials = async (): Promise<Credential> => {
  const newCredentials = await inquirer.prompt<Credential>([
    {
      type: "input",
      name: "userService",
      message: "Please choose the service",
    },
    {
      type: "input",
      name: "userName",
      message: "Please enter your username",
    },
    {
      type: "password",
      name: "userPassword",
      message: "Please enter your password",
      mask: [],
    },
  ]);
  return newCredentials;
};
