import ImageKit from "@imagekit/nodejs";

const storageInstance = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const sendFiles = async (file, fileName) => {
  const obj = {
    file: Buffer.isBuffer(file) ? file.toString("base64") : file,
    fileName: fileName || `file_${Date.now()}`,
    folder: "Demo",
  };

  return await storageInstance.files.upload(obj);
};
