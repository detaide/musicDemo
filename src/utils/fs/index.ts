import * as BrowserFS from 'browserfs';
import { FileSystem } from 'browserfs/dist/node/core/file_system';

// 创建 LocalStorage 文件系统
const createFileSystem = (): Promise<FileSystem> => {
  return new Promise<FileSystem>((resolve, reject) => {
    BrowserFS.FileSystem.LocalStorage.Create({}, (err, fs) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(fs as unknown as FileSystem);
    });
  });
};

// 在 async/await 函数中调用 createFileSystem() 函数
const initFileSystem  = async (): Promise<FileSystem> => {
  try {
    const fileSystem = await createFileSystem();
    return fileSystem;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 导出 FileSystem 对象
export default await initFileSystem();