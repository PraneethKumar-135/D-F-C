import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "../Slice/PersonalInfoSlice"; // Make sure the path is correct
import  SocialMediaAgencySlice  from "../Slice/SocialAgencySlice";
import  HotelInfoSlice  from "../Slice/HotelInfoSlice";


const store = configureStore({
    reducer: {
        personalInformation: personalInfoReducer,
        SocialMediaInfo: SocialMediaAgencySlice,
        hotelInformation: HotelInfoSlice
    }
});

export default store;
