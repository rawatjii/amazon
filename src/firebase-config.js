import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBXTJ933M80KhdZHsq9RI235eatTkCoaWQ",
    authDomain: "clone-17e54.firebaseapp.com",
    databaseURL: "https://clone-17e54-default-rtdb.firebaseio.com",
    projectId: "clone-17e54",
    storageBucket: "clone-17e54.appspot.com",
    messagingSenderId: "753771519749",
    appId: "1:753771519749:web:f9673443b8061377d4616c"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);

  export function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }