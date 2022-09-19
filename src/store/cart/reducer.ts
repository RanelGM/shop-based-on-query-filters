import { createReducer } from "@reduxjs/toolkit";
import { CartItem } from "types/cart";
import { setGuitarInCart, removeFromCart, setCartItem } from "./actions";
import { getLocalStorageCart, setLocalStorageCart } from "./localStorage";

type State = {
  cart: CartItem[];
};

export const initialState: State = {
  // Сохранение корзины на сервере не предполагается, поэтому сохраняется в localStorage в редьюсере
  cart: getLocalStorageCart() || [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitarInCart, (state, action) => {
      // Используется для добавления гитар в корзину
      let cart = state.cart;
      const guitar = action.payload;

      let guitarIndex = -1;
      // Находит есть ли гитара в корзине, если есть, то перезаписывает index
      const guitarItem = cart.find((cartItem, cartIndex) => {
        const isGuitarInCart = cartItem.id === guitar.id;
        guitarIndex = isGuitarInCart ? cartIndex : guitarIndex;
        return isGuitarInCart;
      });

      // В случае, если гитара уже есть в корзине, то увеличивает её количество
      // Если нет, то добавляет с количеством 1
      if (guitarItem) {
        cart = [
          ...cart.slice(0, guitarIndex),
          { ...guitarItem, amount: guitarItem.amount + 1 },
          ...cart.slice(guitarIndex + 1),
        ];
      } else {
        cart = [...cart, { ...guitar, amount: 1 }];
      }

      state.cart = cart;
      setLocalStorageCart(cart);
    })
    .addCase(setCartItem, (state, action) => {
      // Используетя для кнопок инкремента и декремента
      let cart = state.cart;
      const index = state.cart.findIndex((gutiarInCart) => gutiarInCart.id === action.payload.id);

      if (index < 0) {
        cart = [...state.cart, action.payload];
      } else {
        cart = [...state.cart.slice(0, index), action.payload, ...state.cart.slice(index + 1)];
      }

      state.cart = cart;
      setLocalStorageCart(cart);
    })
    .addCase(removeFromCart, (state, action) => {
      let cart = state.cart;
      const index = cart.findIndex((cartItem) => cartItem.id === action.payload);

      if (index >= 0) {
        cart = [...cart.slice(0, index), ...cart.slice(index + 1)];
        state.cart = cart;
        setLocalStorageCart(cart);
      }
    });
});
