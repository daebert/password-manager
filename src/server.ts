import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {
  deleteCredential,
  readCredentials,
  saveCredential,
} from "./utils/credentials";
import { connectDatabase } from "./utils/database";

if (process.env.MONGO_URL === undefined) {
  throw new Error("Missing env MONGO_URL");
}

const app = express();
const port = 5000;

app.use(express.json());

app.get("/api/credentials", async (_request, response) => {
  const credentials = await readCredentials();
  response.json(credentials);
});

app.post("/api/credentials", async (request, response) => {
  const newCredential = await request.body;
  saveCredential(newCredential);
  response.json(request.body);
});

app.delete("/api/credentials/:userService", async (request, response) => {
  console.log(request.params.userService);
  await deleteCredential(request.params.userService);
  response.send("delete credential");
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`myFirstDatabase listening at http://localhost:${port}`);
  });
});
