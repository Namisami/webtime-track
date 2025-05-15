import initializeStorage from "@/core/storage/init";

export default async function handleInstall() { 
  await initializeStorage();
}
