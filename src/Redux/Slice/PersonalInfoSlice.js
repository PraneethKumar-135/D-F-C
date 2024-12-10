import { createSlice } from "@reduxjs/toolkit";
import { updateHotelInformation } from "./HotelInfoSlice";
import { updateSocialMediaAgency } from "./SocialMediaAgencySlice";

export const PersonalInfoSlice = createSlice({
    name: "personalInformation",
    initialState: {
        PersonalInfoData: {},
        currentPage: 1,
        PageToogle: false,
        buttonClick: false,
        PersonalInfoError: {},
        BorderVisible: false
    },
    reducers: {
        updatePersonalInformation: (state, action) => {
            const PayloadData = action.payload;

            Object.keys(PayloadData).forEach((field) => {
                if (PayloadData[field] === "") {
                    console.log("Please enter", field);
                    state.PersonalInfoError[field] = true; // Set error to true
                } else {
                    state.PersonalInfoError[field] = false; // Clear error if resolved
                }
            });

            const hasErrors = Object.values(state.PersonalInfoError).some((error) => error === true);
            console.log(hasErrors);


            if (hasErrors) {
                console.log("Errors present, clearing PersonalInfoData.");
                state.currentPage = 1;
                state.buttonClick = false;
                state.BorderVisible = hasErrors// Clear data if there are errors
            } else {
                // console.log("Payload updated successfully.");
                state.PersonalInfoData = PayloadData;
                state.currentPage = 2;
                state.buttonClick = true;
                state.BorderVisible = false; // Update data if no errors
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
            const hotelData = action.payload;
            if (!hotelData.HasErrors) {
                state.buttonClick = hotelData.ButtonClick;
                state.currentPage = hotelData.CurrentPage;
            }
        });

        builder.addCase(updateSocialMediaAgency, (state, action) => {
            // console.log("ExtraReducer", action.payload);
            const SocialMediaAgency = action.payload;
            if (!SocialMediaAgency.HasErrors) {
                state.buttonClick = SocialMediaAgency.ButtonClick;
                state.currentPage = SocialMediaAgency.CurrentPage;
            }
        });
    },
})

export const {
    updatePersonalInformation,
    updatedCurrentPage,
    updateinputs,
    editMainPage,
    updatebuttonClick
} = PersonalInfoSlice.actions;

export default PersonalInfoSlice.reducer;