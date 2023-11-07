"use server";

import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  var files: Array<File> = [];
  //console.log("🚀 ~ file: route.ts:7 ~ POST ~ data:", data.get("files[]"));
  // const files: Array<File> | null = data.get(
  //   "files[]"
  // ) as unknown as Array<File>;
  //console.log("🚀 ~ file: route.ts:8 ~ POST ~ files:", files);
  const count = data.get("count");
  for (let index = 0; index < parseInt(count as string); index++) {
    files.push(data.get(`file${index}`) as unknown as File);
  }
  console.log("🚀 ~ file: route.ts:17 ~ POST ~ files:", files);

  if (!files) {
    return NextResponse.json({ succes: false });
  }

  const folder = data.get("folder");
  const mainPath = join(
    process.env.PROJECT_PUBLIC_PATH as string,
    "pictures",
    folder as string
  );

  console.log("🚀 ~ file: route.ts:27 ~ POST ~ mainPath:", mainPath);

  try {
    if (
      !fs.existsSync(
        join(process.env.PROJECT_PUBLIC_PATH as string, "pictures")
      )
    ) {
      fs.mkdirSync(join(process.env.PROJECT_PUBLIC_PATH as string, "pictures"));
      console.log(
        "PATH:",
        join(process.env.PROJECT_PUBLIC_PATH as string, "pictures")
      );
    }
  } catch (error) {
    console.log("🚀 ~ file: route.ts:27 ~ POST ~ error:", error);
  }

  try {
    if (!fs.existsSync(mainPath)) {
      fs.mkdirSync(mainPath);
    }
  } catch (err) {
    console.log("🚀 ~ file: route.ts:35 ~ POST ~ err:", err);
  }

  files.forEach(async (file) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(mainPath, file.name);
    await writeFile(path, buffer);
    console.log("File saved at", path);
  });

  var returnObject = {};

  files.forEach((file, index) => {
    const path = join("/pictures", folder as string, file.name);
    returnObject = { ...returnObject, [index]: path };
  });

  console.log("🚀 ~ file: route.ts:59 ~ POST ~ returnObject:", returnObject);
  return NextResponse.json({ paths: returnObject });
}
