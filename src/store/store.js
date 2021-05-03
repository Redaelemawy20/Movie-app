import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import api from "./middleware/api";
import { composeWithDevTools } from "redux-devtools-extension";
export default createStore(
  reducer,

  composeWithDevTools(
    applyMiddleware(api)
    // other store enhancers if any
  )
);
