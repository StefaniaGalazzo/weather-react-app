// store.js
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import dataReducer from "../reducers/dataReducer";
import formattersReducer from "../reducers/formattersReducer";

const store = configureStore({
  reducer: {
    dataReducer: dataReducer,
    formattersReducer: formattersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
    }),
});

export default store;
