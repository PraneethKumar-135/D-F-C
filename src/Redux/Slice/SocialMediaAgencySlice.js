import { createSlice } from "@reduxjs/toolkit";


export const SocialMediaAgencySlice = createSlice({
    name: "SocialMediaAgencyInfo",
    initialState: {
        AgencyInformation: {},
        SocialMediaAgencySliceError: {},
        SocialMedaiToggle: false
    },
    reducers: {
        updateSocialMediaAgency: (state, action) => {
            const PayloadData = action.payload;
            console.log("PayloadData", PayloadData);


            Object.keys(PayloadData).forEach((field) => {
                if (PayloadData[field] === "") {
                    // console.log("Please enter", field);
                    state.SocialMediaAgencySliceError[field] = true; // Set error to true
                } else {
                    state.SocialMediaAgencySliceError[field] = false; // Clear error if resolved
                }
            });

            const hasErrors = Object.values(state.SocialMediaAgencySliceError).some((error) => error === true);
            console.log(hasErrors);


            if (hasErrors) {
                console.log("Errors present.");
                state.AgencyInformation = { HasErrors: hasErrors };
            } else {
                // console.log("Payload updated successfully.");
                state.AgencyInformation = { ...PayloadData, HasErrors: hasErrors };
            }
        },
        updateSocialMediaAgencyToggle: (state, action) => {
            state.SocialMedaiToggle = action.payload;
        }

    }
});

export const { updateSocialMediaAgency, updateSocialMediaAgencyToggle } = SocialMediaAgencySlice.actions;

export default SocialMediaAgencySlice.reducer;