import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "../Slice/PersonalInfoSlice"; // Make sure the path is correct

const store = configureStore({
    reducer: {
        personalInformation: personalInfoReducer
    }
});

export default store;
