import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // read file names under /posts dir
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove .md from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  // sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
