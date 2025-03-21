import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  products : [
    {
      id: 1,
      productName: "product 1",
      productPrice: "1000",
    },
    {
      id: 2,
      productName: "product 2",
      productPrice: "1000",
    },
  ]
};



export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * @returns {Promise<void>} add the product in to cart
     * @param {*} state 
     * @param {*} action 
     */
    addToCart: (state, action) => {
      try {
        console.log(action.payload,"adca");
        
        const cartItem = state.cartItems.find(
          (cartItem) => cartItem.id === action.payload       
        );
        
          if (cartItem) {
          state.cartItems = state.cartItems.map((cartItem) =>
            cartItem.id == action.payload
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          console.log(action.payload);
          
          // const product = state.products.find((product) => product.id === action.payload)
          // console.log(product,"product");
          
          // const newCartItem = {
          //   id: nanoid(),
          //   productId : product.id,
          //   productName: product.productName,
          //   quantity: 1,
          //   productPrice: product.productPrice,
          // };
          state.cartItems.push({...action.payload,quantity : 1,cartID : nanoid()});
        }
      
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @return {Promise<void>} decrease the quantity of product in cart
     * @param {*} state 
     * @param {*} action 
     */
    removeFromCart: (state, action) => {
      try {
        // console.log(action);
        
        const cartItem = state.cartItems.find(
          (cartItem) => cartItem.id == action.payload
        );

        if (cartItem.quantity > 1) {
          state.cartItems = state.cartItems.map((cartItem) =>
            cartItem.id == action.payload
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id != action.payload
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @returns {Promise<void>} remove all quntity of product from cart
     * @param {*} state 
     * @param {*} action 
     */
    removeItemFromCart : (state,action) => {
      try {
        // console.log(action);
        
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id != action.payload
        );
      } catch (error) {
        console.log(error);
        
      }
    }
  },
});

export const { addToCart, removeFromCart,removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
