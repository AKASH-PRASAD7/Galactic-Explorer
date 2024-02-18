import { configureStore } from "@reduxjs/toolkit";
import starWarsReducer from "@/strore/feautures/starWars";

const store = configureStore({
  reducer: {
    starWars: starWarsReducer,
  },
});

export default store;
