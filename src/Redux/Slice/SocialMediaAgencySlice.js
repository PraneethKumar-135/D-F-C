import { createSlice } from "@reduxjs/toolkit";


export const SocialMediaAgencySlice = createSlice({
    name:"SocialMediaAgencyInfo",
    initialState:{
        AgencyInformation:{}
    },
    reducers:{
        updateSocialMediaAgency:(state,action) => {
            console.log(action.payload);
            state.AgencyInformation = action.payload
        }
    }
});

export const { updateSocialMediaAgency } = SocialMediaAgencySlice.actions;

export default SocialMediaAgencySlice.reducer;