import { createContext, useEffect, useState } from "react";
import fetchData from "../helpers/axiosHelper";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState({});
  const [resetProducts, setResetProducts] = useState(false);
  const [resetCategories, setResetCategories] = useState(false);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchData("products/getAllProducts", "get");
        setProducts(res)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  },[resetProducts])

  
  useEffect(() => {
    
    const fetchUser = async (token) => {
      try {
        const res = await fetchData("users/getOneUser", "get", null, {
          Authorization: `Bearer ${token}`,
        });
        setUser(res.user);
        setToken(token);
        setIsAuthenticated(true)
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false)
      }
    };
   
    const fetchCategories = async () => {
      try {
        const res = await fetchData("products/getAllCategories", "get");
        setCategories(res);

       
      } catch (error) {
        console.log(error);
      }
    };
    
    const tokenLocalStorage = localStorage.getItem("token");
    if (tokenLocalStorage) {
      fetchUser(tokenLocalStorage);
      setToken(tokenLocalStorage)
    }
   
    fetchCategories();
  }, [resetCategories]);

  useEffect(()=>{
    const cartLocalStore = localStorage.getItem("cart")
    if(cartLocalStore){
      setCartItems(JSON.parse(cartLocalStore))
    }
  }, [])


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchData("users/getAllUsers", "get"); 
        setUsers(res); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); 
  }, []);

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };
  
  const addToCart = (product) => {
    
    if (!Array.isArray(cartItems)) {
      setCartItems([]); 
      return;
    }
  
    // Verifica si el producto ya existe en el carrito
    if (cartItems.some(e => e.product_id === product.product_id)) {
      let cardItemTemp = cartItems.map(item => {
        if (item.product_id === product.product_id) {
          return { ...item, amount: product.amount };
        } else {
          return item;
        }
      });
      setCartItems(cardItemTemp);
      localStorage.setItem("cart", JSON.stringify(cardItemTemp));
    } else {
      // Si el producto no está en el carrito, lo añadimos
      setCartItems((prev) => [...prev, product]);
      let arrayTemp = [...cartItems, product];
      localStorage.setItem("cart", JSON.stringify(arrayTemp));
    }
  };
  

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter(item => item.product_id !== productId));
    let arrayTemp = cartItems.filter(item => item.product_id !==productId);
  if(arrayTemp.length){
    localStorage.setItem("cart", JSON.stringify(arrayTemp))
  }else{
    localStorage.removeItem("cart")
  }
  };
  
  const updateCategory = (updatedCategory) => {
    console.log("Actualizando categoría:", updatedCategory); 
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.category_id === updatedCategory.category_id
          ? { ...category, category_name: updatedCategory.category_name }
          : category
      )
    );
};


  
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        users, 
        setUsers,
        products,
        setProducts,
        categories,
        setCategories,
        token,
        setToken,
        addCategory,
        updateCategory, 
        cartItems,
        removeFromCart,
        addToCart, 
        setIsAuthenticated,
        isAuthenticated,
        setCartItems,
        order,
        setOrder,
        resetProducts,
        setResetProducts,
        resetCategories,
        setResetCategories
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
