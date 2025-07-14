
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoylGqPXjUxsyXQJ4UB_Ns_iNc763_yrE",
  authDomain: "traineplus.firebaseapp.com",
  projectId: "traineplus",
  storageBucket: "traineplus.firebasestorage.app",
  messagingSenderId: "234800915164",
  appId: "1:234800915164:web:6c7bb0b8972f4c5e050a19"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db,}