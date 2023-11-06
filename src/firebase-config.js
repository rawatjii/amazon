import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update, query, orderByChild, equalTo, get  } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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
  const db = getDatabase();

  export function fetchUserData() {
    const usersRef = ref(db, 'users');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo('sandeep@gmail.com'));

    get(emailQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // The user data is available in the snapshot's val()
        const userData = snapshot.val();
        return userData;
      } else {
        console.log('User not found.');
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });

  }

  export function writeUserData(userId, name, email, imageUrl) {
    set(ref(db, 'users/' + userId), {
      userId:userId,
      username: name,
      email: email,
      profile_picture : imageUrl,
    });
  }

  export function getAllUsers(){
    const usersRef = ref(db, 'users/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      return data;
      // console.log('all users data', data);
      // updateStarCount(postElement, data);
    });
  }

  export function addProduct(data){
    set(ref(db, 'products/' + data.id), {
      id:data.id,
      product_title:data.product_title,
      categories:data.categories,
      price:data.price,
      rating:data.rating,
      images:data.images,
    })
  }

  export function updateProduct(productId, productData){
    const productRef = ref(db, `products/${productId}`);
    update(productRef,{
      ...productData
    });
  }