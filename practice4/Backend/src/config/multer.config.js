import multer from "multer";

const store = multer.memoryStorage();

export const upload = multer({ storage: store });
