import { readFile } from "node:fs/promises";
import process from "node:process";
import console from "node:console";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

config({ path: join(dirname(fileURLToPath(import.meta.url)), "..", ".env.local") });

const REQUIRED_FIELDS = ["id", "price", "description", "category"];

export const validateMenuItems = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Menu items file must be an object keyed by item name.");
  }

  for (const [key, value] of Object.entries(data)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error(`Menu item "${key}" must be an object.`);
    }

    for (const field of REQUIRED_FIELDS) {
      if (!(field in value)) {
        throw new Error(`Menu item "${key}" is missing required field: ${field}.`);
      }
    }

    if (typeof value.id !== "string" || value.id.trim() === "") {
      throw new Error(`Menu item "${key}" has an invalid id.`);
    }

    const resolvedName = typeof value.name === "string" && value.name.trim() !== ""
      ? value.name
      : key;
    value.name = resolvedName;

    if (typeof value.price !== "number" || Number.isNaN(value.price)) {
      throw new Error(`Menu item "${key}" has an invalid price.`);
    }

    if (typeof value.description !== "string" || value.description.trim() === "") {
      throw new Error(`Menu item "${key}" has an invalid description.`);
    }

    if (typeof value.category !== "string" || value.category.trim() === "") {
      throw new Error(`Menu item "${key}" has an invalid category.`);
    }
  }

  return data;
};

const parseArgs = (args) => {
  const fileIndex = args.indexOf("--file");
  if (fileIndex === -1 || !args[fileIndex + 1]) {
    throw new Error("Usage: node scripts/add-menu-items.js --file path/to/menu.json");
  }

  return { filePath: args[fileIndex + 1] };
};

const getFirebaseConfig = () => {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!projectId) {
    throw new Error("Missing VITE_FIREBASE_PROJECT_ID in environment.");
  }

  if (!privateKey || !clientEmail) {
    throw new Error("Missing FIREBASE_PRIVATE_KEY or FIREBASE_CLIENT_EMAIL in environment. Set these in your .env.local file.");
  }

  return { projectId, privateKey, clientEmail };
};

const uploadMenuItems = async (menuItems, { projectId, privateKey, clientEmail }) => {
  const formattedKey = privateKey.includes('\\n') 
    ? privateKey.split('\\n').join('\n') 
    : privateKey;
  
  const credential = admin.credential.cert({
    projectId,
    privateKey: formattedKey,
    clientEmail
  });

  const app = admin.initializeApp({ credential, projectId });
  const db = getFirestore(app);

  const batch = db.batch();
  const collectionRef = db.collection("Menu");

  for (const item of Object.values(menuItems)) {
    const docRef = collectionRef.doc(item.id);
    batch.set(docRef, {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category
    });
  }

  await batch.commit();
  return Object.keys(menuItems).length;
};

const run = async () => {
  const { filePath } = parseArgs(process.argv.slice(2));
  const fileContents = await readFile(filePath, "utf8");
  const parsed = JSON.parse(fileContents);
  const validated = validateMenuItems(parsed);
  const config = getFirebaseConfig();

  const count = await uploadMenuItems(validated, config);
  console.log(`Uploaded ${count} menu items to Firestore.`);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  });
}
