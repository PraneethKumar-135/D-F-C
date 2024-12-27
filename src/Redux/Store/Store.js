import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "../Slice/PersonalInfoSlice"; 
import  SocialMediaAgencySlice  from "../Slice/SocialMediaAgencySlice";
import  HotelInfoSlice  from "../Slice/HotelInfoSlice";
import  SocialMediaSlice  from "../Slice/SocialMediaSlice";


const store = configureStore({
    reducer: {
        personalInformation: personalInfoReducer,
        hotelInformation: HotelInfoSlice,
        SocialMediaAgencyInfo: SocialMediaAgencySlice,
        socialMediaInfo: SocialMediaSlice
    }
});

export default store;
