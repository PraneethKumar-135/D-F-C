import { createSlice } from "@reduxjs/toolkit";

const SocialMediaSlice = createSlice({
    name: "socialMediaInfo",
    initialState: {
        SocialMediaInformation: {}
    },
    reducers: {
        updateSocialMediaAccounts: (state, action) => {
            console.log(action.payload);
            state.SocialMediaInformation = action.payload
        }
    }
})

export const { updateSocialMediaAccounts } = SocialMediaSlice.actions;

export default SocialMediaSlice.reducer;