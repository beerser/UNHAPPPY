import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore, 
    getDocs, 
    query, 
    where,
    doc, 
    updateDoc, 
    increment
} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyBtNoZSWSgk4VbdxIhX1U_c1rW6uCVK_dY",
    authDomain: "happyphone888-97d1b.firebaseapp.com",
    projectId: "happyphone888-97d1b",
    storageBucket: "happyphone888-97d1b.appspot.com",
    messagingSenderId: "428834158869",
    appId: "1:428834158869:web:023ac02b805666b5e1511c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        toast.success('Successfully signed up!');
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Successfully logged in!');
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};


const logout = () => {
    toast.info('You have been logged out.');
    signOut(auth);
};


const searchProducts = async (searchTerm) => {
    try {
        const q = query(collection(db, "products"), where("nameProduct", ">=", searchTerm), where("nameProduct", "<=", searchTerm + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });

        if (products.length > 0) {
            console.log("Products found:", products);
            return products;
        } else {
            console.log("No products found");
            return [];
        }
    } catch (error) {
        console.error("Error searching products: ", error);
        toast.error("Failed to search products.");
        return [];
    }
};


const updateStock = async (productId, quantity) => {
    try {
        const productRef = doc(db, "products", productId); 
        await updateDoc(productRef, {
            stock: increment(-quantity) 
        });
        console.log("Stock updated successfully!");
    } catch (error) {
        console.error("Error updating stock: ", error);
    }
};


const addToCartAndUpdateStock = async (productId, quantity) => {
  try {
   
    await addDoc(collection(db, "cart"), {
      productId: productId,
      quantity: quantity,
      addedAt: new Date()
    });
    console.log("Product added to cart successfully!");

    await updateStock(productId, quantity);
    console.log("Stock updated successfully after adding to cart!");
  } catch (error) {
    console.error("Error processing purchase: ", error);
  }
};

export { auth, db, login, signup, logout, searchProducts, updateStock, addToCartAndUpdateStock };
