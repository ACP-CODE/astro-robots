import { fileURLToPath } from "node:url";
import fs from "fs/promises";

// export async function getFileSizeInKilobytes(fileUrl: URL): Promise<number> {
//   const filePath = fileURLToPath(fileUrl);

//   try {
//     await fs.access(filePath);
//     const fileBuffer = await fs.readFile(filePath); // 读取整个文件
//     return fileBuffer.length / 1024; // 文件字节数转 KB
//   } catch (error) {
//     console.error("Error reading file:", error);
//     return 0;
//   }
// }

export function getFileSizeInKilobytes(fileBuffer: string): number {
  return Buffer.byteLength(fileBuffer, 'utf8') / 1024; // 字符串长度转 KB
}

