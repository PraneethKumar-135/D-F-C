import { createSlice } from "@reduxjs/toolkit";


export const SocialMediaAgencySlice = createSlice({
    name:"SocialMediaInfo",
    initialState:{
        AgencyInformation:{}
    },
    reducers:{
        updateSocialMediaAccounts:(state,action) => {
            console.log(action.payload);
            state.AgencyInformation = action.payload
        }
    }
});

export const { updateSocialMediaAccounts } = SocialMediaAgencySlice.actions;

export default SocialMediaAgencySlice.reducer;