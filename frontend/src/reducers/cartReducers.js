import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants"

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

export const cartReducer = (
  state = {
    cartItems: [...cartItemsFromStorage],
    shippingAddress: { ...shippingAddressFromStorage },
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }

    default:
      return state
  }
}
