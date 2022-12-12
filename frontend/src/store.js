import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

const allReducers = combineReducers({})

const initialState = {}

const middleware = [thunk]

const store = configureStore(
  { reducer: allReducers },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
