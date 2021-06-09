import axios from "axios";
import { apiCallBegin } from "../reducer";
const api = (store) => (next) => async (action) => {
  if (action.type !== apiCallBegin.type) return next(action);
  else {
    next(action);
    console.log(action);
    const { url, onSuccess } = action.payload;
    try {
      const response = await axios.request({
        url,
      });

      store.dispatch(onSuccess(response.data));
    } catch (error) {
      store.dispatch({ type: "apiRequestFailed" });
    }
  }
};
export default api;
