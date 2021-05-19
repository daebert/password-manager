export type Command = "list" | "add" | "delete";

export type Credential = {
  userService: string;
  userName: string;
  userPassword: string;
};
