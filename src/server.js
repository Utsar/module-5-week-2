import express from "express";

const PORT = 3001;

const server = express();
server.listen(PORT, () => {
  console.log("The server is running on port:", PORT);
});

// middlewares

server.use(cors());
