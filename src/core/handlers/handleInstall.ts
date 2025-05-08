import initializeStorage from "../storage/init";

export default async function handleInstall() { 
  await initializeStorage();
}
