import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjy72yc2iOBKFfHftx4EuE72i4hFi5VeU",
  authDomain: "e-commerce-frontend-d36ec.firebaseapp.com",
  projectId: "e-commerce-frontend-d36ec",
  storageBucket: "e-commerce-frontend-d36ec.firebasestorage.app",
  messagingSenderId: "677080343272",
  appId: "1:677080343272:web:4e4d7cfc360b02b6625f5d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);