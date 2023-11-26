import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update, query, orderByChild, equalTo, get, remove  } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, debugErrorMap } from "firebase/auth";


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

  export async function fetchUserData(userEmail) {
    const usersRef = ref(db, 'users');
    if(!userEmail){
      return null;
    }
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(userEmail));

    const snapshot = await get(emailQuery)
    if (snapshot.exists()) {
        // The user data is available in the snapshot's val()
        const userData = snapshot.val();
        return userData;  
      } else {
        console.log('User not found.');
      }
    // .then((snapshot) => {
    //   if (snapshot.exists()) {
    //     // The user data is available in the snapshot's val()
    //     const userData = snapshot.val();
    //     return userData;
    //   } else {
    //     console.log('User not found.');
    //   }
    // }
    // )
    // .catch((error) => {
    //   console.error('Error fetching user data:', error);
    // });

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

  export async function addProduct(data){
    try{
      await set(ref(db, 'products/' + data.id), data)
    }
    catch(err){
      throw err;
    }
  }

  export async function updateProduct(productId, productData){
    const productRef = ref(db, `products/${productId}`);

    try{
      await update(productRef,{
        ...productData
      });
    }catch(err){
      throw err
    }
    
  }

  export async function getAllBrands(){
    const brandRef = ref(db, 'brands/');
    const snapshot = await get(brandRef)

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;  
    } else {
      console.log('brand not found.');
    }

  }

  export async function writeBrands(brandId, brandName) {
    try{
      const allBrands = await getAllBrands();
      var allBrandsName = [];

      if(allBrands){
        allBrandsName = Object.values(allBrands).map((data)=>{
          return data.brand;
        })
      }

      if(allBrandsName.includes(brandName)){
        throw new Error('Brand Name Already Exists');
      }else{
        await set(ref(db, 'brands/' + brandId), {
          brandId:brandId,
          brand: brandName,
        });
      }

    }catch(err){
      throw err;
    }
    
  }


  export async function getBrandById(brandId){
    const brandData = ref(db, `brands/${brandId}`);
    const snapshot = await get(brandData)

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;  
    } else {
      console.log('brand not found.');
    }
  }

  export async function updateBrand(brandId, data){
    const brandRef = ref(db, `brands/${brandId}`);
    
    try{
      await update(brandRef, {
        ...data
      });
    }catch(err){
      console.log(err);
      throw err;
    }
    
  }

  export async function removeBrand(brandId){
    const brandRef = ref(db, `brands/${brandId}`);

    try{  
      await remove(brandRef);
    }catch(error){
      throw error;
    }
  }

  export async function getCategoryById(categoryId){
    const categoryData = ref(db, `categories/${categoryId}`);
    const snapshot = await get(categoryData)

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;  
    } else {
      console.log('Category not found.');
    }
  }

  export async function getAllCategories(){
    const categoryRef = ref(db, 'categories/');
    const snapshot = await get(categoryRef)

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;  
    } else {
      console.log('Category not found.');
    }

  }

  export async function addCategory(categoryId, categoryName) {
    try{
      const allCategories = await getAllCategories();
      var allCategoriesName = [];

      if(allCategories){
        allCategoriesName = Object.values(allCategories).map((data)=>{
          return data.category;
        })
      }

      if(allCategoriesName.includes(categoryName)){
        throw new Error('Category Already Exists');
      }else{
        await set(ref(db, 'categories/' + categoryId), {
          id:categoryId,
          category: categoryName,
        });
      }

    }catch(err){
      throw err;
    }
    
  }

  export async function removeCategory(brandId){
    const categoryRef = ref(db, `categories/${brandId}`);

    try{  
      await remove(categoryRef);
    }catch(error){
      throw error;
    }
  }

  export async function updateCategory(categoryId, categoryName){
    const categoriesRef = ref(db, `categories/${categoryId}`);
    
    try{
      await update(categoriesRef, {
        category:categoryName
      });
    }catch(err){
      console.log(err);
      throw err;
    }
    
  }


  export async function addSubCategory(categoryId, subCategoryId, subCategoryName){
    try{
      if(subCategoryName !== ''){
        var allSubCategoriesName = [];
        const allCategoriesData = await getAllCategories();

        if(allCategoriesData){
          const allCatData = Object.values(allCategoriesData).map((data)=>{
            if(data.hasOwnProperty('subCategories')){
              return data.subCategories;
            }
          })

          allCatData.map(item=>{
            if(item){
              Object.values(item).map(singleSubCat =>{
                allSubCategoriesName.push(singleSubCat.category)
              })
            }
          })
          
        }

        if(allSubCategoriesName.includes(subCategoryName)){
          throw new Error('Sub Category Already Exists');
        }

        await set(ref(db, 'categories/' + categoryId + '/subCategories/' + subCategoryId), {
          id:subCategoryId,
          category: subCategoryName,
        });
      }
      
    }catch(err){
      console.log(err);
      throw err;
    }
    
  }

  export async function updateSubCategory(categoryId, subCategoryId, categoryData){
    try{
      // var subCategoryPos = null;

      // const categoryData = await getCategoryById(categoryId);
      //   Object.values(categoryData.subCategories).map((data)=>{
      //     if(data.id === subCategoryId){
      //       subCategoryPos = index;
      //     }
      //   })
        
        const categoriesRef = ref(db, `categories/${categoryId}/subCategories/${subCategoryId}`);  
        await update(categoriesRef, categoryData)
    }catch(err){
      console.log(err);
      throw err;
    }
    
  }

  export async function removeSubCategory(categoryId, subCategoryId){
    try{

      const subCategoriesRef = ref(db, `categories/${categoryId}/subCategories/${subCategoryId}`);
      await remove(subCategoriesRef);

    }catch(err){
      throw err;
    }
  }

 