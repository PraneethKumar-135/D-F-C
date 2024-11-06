import { createSlice } from "@reduxjs/toolkit";

 export const PersonalInfoSlice = createSlice({
    name: "personalInformation",
    initialState: {
        PersonalInfoData: {}
    },
    reducers: {
        updatePersonalInformation: (state, action) => {
            console.log(action.payload);
            state.PersonalInfoData = action.payload
        },
    },
})

export const { updatePersonalInformation } = PersonalInfoSlice.actions;

export default PersonalInfoSlice.reducer;