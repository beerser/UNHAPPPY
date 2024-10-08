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
    increment,
    getDoc, // Added correct import for getting document data
    orderBy, 
    limit
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
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

// Sign up function
const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            cart:[],
            phoneNumber: "",
            address: "",
            role: "users",
            profile:"",
            gender:"",
        });
        toast.success('Successfully signed up!');
    } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Login function
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Successfully logged in!');
    } catch (error) {
        console.error("Error logging in:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Logout function
const logout = () => {
    try {
        signOut(auth);
        toast.info('You have been logged out.');
    } catch (error) {
        console.error("Error logging out:", error);
        toast.error('Failed to log out.');
    }
};

// Search products by term
const searchProducts = async (searchTerm) => {
    try {
        const q = query(
            collection(db, "products"), 
            where("nameProduct", ">=", searchTerm), 
            where("nameProduct", "<=", searchTerm + '\uf8ff')
        );
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

// Update stock for a product
const updateStock = async (productId, quantity) => {
    try {
        const productRef = doc(db, "products", productId); 
        const productSnap = await getDoc(productRef); // Corrected to getDoc

        if (productSnap.exists()) {
            const currentStock = productSnap.data().stock;
            if (currentStock >= quantity) {
                await updateDoc(productRef, {
                    stock: increment(-quantity)
                });
                console.log("Stock updated successfully!");
            } else {
                console.error("Insufficient stock for product:", productId);
                toast.error("Insufficient stock.");
            }
        } else {
            console.error("Product not found:", productId);
            toast.error("Product not found.");
        }
    } catch (error) {
        console.error("Error updating stock:", error);
    }
};

// Add product to cart and update stock
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
        console.error("Error processing purchase:", error);
        toast.error("Error processing purchase.");
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลใบเสร็จจาก Firestore
const getReceipt = async () => {
    try {
        const q = query(collection(db, 'receipts'), orderBy('timestamp', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        const receipt = querySnapshot.docs[0].data();
        return receipt;
    } catch (error) {
        console.error("Error fetching receipt:", error);
        return null;
    }
};

export { auth, db, login, signup, logout, searchProducts, updateStock, addToCartAndUpdateStock, getReceipt };
