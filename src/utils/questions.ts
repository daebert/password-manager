import inquirer from "inquirer";

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
