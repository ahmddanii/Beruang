import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root folder uploads (server/uploads)
const UPLOAD_ROOT = path.resolve(__dirname, "../../uploads");

function getStorage(subfolder: "vdr" | "reports" | "receipts" | "avatars") {
  const dir = path.join(UPLOAD_ROOT, subfolder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const cleanBase = path
        .basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 40);
      const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e4);
      cb(null, `${cleanBase}_${uniqueSuffix}${ext}`);
    },
  });
}

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedExtensions = [
    ".pdf",
    ".xlsx",
    ".xls",
    ".csv",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".doc",
    ".docx",
  ];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipe berkas ${ext} tidak diizinkan. Gunakan PDF, Excel, atau Gambar.`));
  }
};

export const uploadVdr = multer({
  storage: getStorage("vdr"),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
  fileFilter,
});

export const uploadReport = multer({
  storage: getStorage("reports"),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
  fileFilter,
});

export const uploadReceipt = multer({
  storage: getStorage("receipts"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter,
});

export const uploadAvatar = multer({
  storage: getStorage("avatars"),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});
