import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers"

const allReducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})

const initialState = {}

const middleware = [thunk]

const store = configureStore(
  { reducer: allReducers },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
