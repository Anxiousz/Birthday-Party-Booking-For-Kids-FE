import "./App.css";
import Layout from "./components/Layout/Layout";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-9c9XNVKixcE7VqGtr76sCoUa7r4sL3E",
  authDomain: "swd392-4f72a.firebaseapp.com",
  projectId: "swd392-4f72a",
  storageBucket: "swd392-4f72a.appspot.com",
  messagingSenderId: "403408251192",
  appId: "1:403408251192:web:43309fd65d10f4ba8cf9cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function App() {
  return <Layout />;
}

export default App;
