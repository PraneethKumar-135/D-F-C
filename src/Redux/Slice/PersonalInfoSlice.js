import { createSlice } from "@reduxjs/toolkit";

export const PersonalInfoSlice = createSlice({
    name: "personalInformation",
    initialState: {
        PersonalInfoData: {},
        currentPage: 1,
        errorInputs: false
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
        updateinputs: (state, action) => {
            state.errorInputs = action.payload;
        }
    },
})

export const { updatePersonalInformation, updatedCurrentPage, updateinputs } = PersonalInfoSlice.actions;

export default PersonalInfoSlice.reducer;