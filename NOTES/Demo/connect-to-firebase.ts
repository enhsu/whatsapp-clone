import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// process.env.FIREBASE_CONFIG is JSON.stringify(config_we_create_in_project_settings)
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export default db;
