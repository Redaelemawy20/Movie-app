import axios from "axios";
const api = (store) => (next) => async (action) => {
  if (action.type !== "apiCallBegin") return next(action);
  else {
    next(action);
    const { url, onSuccess } = action.payload;
    try {
      const response = await axios.request({
        url,
      });
      store.dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      store.dispatch({ type: "apiRequestFailed" });
    }
  }
};
export default api;
