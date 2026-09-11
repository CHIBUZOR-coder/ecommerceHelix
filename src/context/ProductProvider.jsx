import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [Product, setProduct] = useState([]);
  const [cartCount, setCartCount] = useState(null);

  const [CartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );
  const token = localStorage.getItem("token");
  const HandleProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "GET",
      });

      const data = await res.json();

      if (!data) {
        console.log("Unable to fetch product");
        return;
      }

      // console.log("data:", data);

      setProduct(data);
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    HandleProducts();
  }, []);

  useEffect(() => {
    let total = CartItems?.reduce((acc, curr) => acc + curr?.quantity, 0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(total || 0);
  }, [CartItems]);

  const RemoveFromCart = (id) => {
    const updatedCart = CartItems.filter(
      (item) => Number(item?.id) !== Number(id),
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const UpdateCartQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = CartItems.map((item) =>
      Number(item?.id) === Number(id) ? { ...item, quantity } : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const ClearCart = () => {
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const AddToCart = async (pro, quantity, size) => {
    let resolvedSize = size || pro?.defaultSize;
    try {
      //1. Get the users cart
      let storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      console.log("stored:", storedCart);

      // varable to store temporal cart updates
      let updatedCart;
      if (!token) {
        //2. Check if the product exist incate
        const existingCart = storedCart?.find(
          (item) => Number(item?.id) === Number(pro?.id),
        );

        // 3. check if exing cart was found
        if (existingCart) {
          console.log("existing:", existingCart);

          // update the particular product
          updatedCart = storedCart?.map((item) =>
            Number(item?.id) === Number(existingCart?.id)
              ? {
                  ...item,
                  quantity: existingCart?.quantity + quantity,
                  size: resolvedSize,
                }
              : item,
          );
          console.log("updated:", updatedCart);

          setCartItems(updatedCart);
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        } else {
          // add the new product
          updatedCart = [
            ...storedCart,
            { ...pro, quantity: quantity, size: resolvedSize },
          ];
          console.log("updated:", updatedCart);
          setCartItems(updatedCart);
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }
      } else {
        console.log("Authentified user");
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <ProductContext.Provider
      value={{
        Product,
        AddToCart,
        cartCount,
        CartItems,
        RemoveFromCart,
        UpdateCartQuantity,
        ClearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
export { ProductProvider };
