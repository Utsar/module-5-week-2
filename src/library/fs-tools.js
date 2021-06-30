import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, createReadStream } = fs;

const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../blogs"
);

export const getBlogs = () => readJSON(join(dataFolderPath, "blogs.json"));

export const getBlogsReadableStream = () =>
  createReadStream(join(dataFolderPath, "blogs.json"));
