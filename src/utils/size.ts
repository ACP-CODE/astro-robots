import fs from "fs/promises";

export async function getFileSizeInKilobytes(fileUrl: URL): Promise<number> {
  try {
    const filePath = fileUrl.pathname;

    // 轮询检查文件大小，确保文件写入完成
    let fileSizeInBytes = 0;
    while (fileSizeInBytes === 0) {
      const stats = await fs.stat(filePath);
      fileSizeInBytes = stats.size;

      // 如果文件大小仍然为 0，稍等片刻再重试
      if (fileSizeInBytes === 0) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // 100 毫秒延迟
      }
    }

    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    return fileSizeInKilobytes;
  } catch (error) {
    console.error("Error reading file size:", error);
    return 0;
  }
}
