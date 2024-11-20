import { createSlice } from "@reduxjs/toolkit";
import { updateHotelInformation } from "./HotelInfoSlice";
import { updateSocialMediaAgency } from "./SocialMediaAgencySlice";

export const PersonalInfoSlice = createSlice({
    name: "personalInformation",
    initialState: {
        PersonalInfoData: {},
        currentPage: 1,
        PageToogle: false,
        buttonClick: false
    },
    reducers: {
        updatePersonalInformation: (state, action) => {
            console.log(action.payload);
            state.PersonalInfoData = action.payload
            if (action.payload) {
                state.buttonClick = true;
                state.currentPage = 2;
            }
        },
        updatedCurrentPage: (state, action) => {
            // console.log(action.payload);
            state.currentPage = action.payload;
        },
        editMainPage: (state, action) => {
            console.log(action.payload);
            state.PageToogle = action.payload;
        },
        updatebuttonClick: (state, action) => {
            state.buttonClick = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(updateHotelInformation, (state, action) => {
            console.log("ExtraReducer", action.payload);
            if (Object.keys(action.payload).length > 0) {
                state.currentPage = 3;
                state.buttonClick = true 
            }
        });
        builder.addCase(updateSocialMediaAgency, (state, action) => {
            console.log("ExtraReducer", action.payload);
            if (Object.keys(action.payload).length > 0) {
                state.currentPage = 4;
                state.buttonClick = true; 
            }
        });
    },
})

export const { updatePersonalInformation, updatedCurrentPage, updateinputs, editMainPage, updatebuttonClick } = PersonalInfoSlice.actions;

export default PersonalInfoSlice.reducer;