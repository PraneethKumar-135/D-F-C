import { createSlice } from "@reduxjs/toolkit";

export const PersonalInfoSlice = createSlice({
    name: "personalInformation",
    initialState: {
        PersonalInfoData: {},
        currentPage: 1,

        mainPageToogle: false
    },
    reducers: {
        updatePersonalInformation: (state, action) => {
            console.log(action.payload);
            state.PersonalInfoData = action.payload
        },
        updatedCurrentPage: (state, action) => {
            // console.log(action.payload);
            state.currentPage = action.payload;
        },
        editMainPage: (state, action) => {
            console.log(action.payload);
            state.mainPageToogle = action.payload;
        }
    },
})

export const { updatePersonalInformation, updatedCurrentPage, updateinputs, editMainPage } = PersonalInfoSlice.actions;

export default PersonalInfoSlice.reducer;