import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import authorsRouter from "./authors/index.js";
import blogsRouter from "../src/blogs/index.js";

import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");

const server = express();
const port = process.env.PORT || 3001;

console.log("DB CONNECTION STRING: ", process.env.MYDBCONNECTIONSTRING);

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors!"));
      }
    },
  })
);
server.use(express.json());
server.use(express.static(publicDirectory));

server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);

server.use(notFound);
server.use(forbidden);
server.use(catchAllErrorHandler);

console.log(listEndpoints(server));

server.listen(port, () => console.log(`Server is running on ${port}`));

server.on("error", (error) =>
  console.log(`Server is not runnin, error: ${error}`)
);
