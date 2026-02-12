import { readFile } from "node:fs/promises";

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
  const apiKey = process.env.VITE_FIREBASE_API_KEY;

  if (!projectId || !apiKey) {
    throw new Error("Missing VITE_FIREBASE_PROJECT_ID or VITE_FIREBASE_API_KEY in environment.");
  }

  return { projectId, apiKey };
};

const uploadMenuItems = async (menuItems, { projectId, apiKey }) => {
  const endpoint = `https://${projectId}.firebaseio.com/Menu.json?auth=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(menuItems)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Firebase error ${String(response.status)}: ${body}`);
  }

  return response.json();
};

const run = async () => {
  const { filePath } = parseArgs(process.argv.slice(2));
  const fileContents = await readFile(filePath, "utf8");
  const parsed = JSON.parse(fileContents);
  const validated = validateMenuItems(parsed);
  const config = getFirebaseConfig();

  await uploadMenuItems(validated, config);
  console.log(`Uploaded ${Object.keys(validated).length} menu items.`);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  });
}
