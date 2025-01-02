import { createSlice } from "@reduxjs/toolkit";

export const SocialMediaAgencySlice = createSlice({
    name: "SocialMediaAgencyInfo",
    initialState: {
        AgencyInformation: {},
        SocialMediaAgencyError: {},
        SocialMediaAgencyErrorMessage: {},
        SocialMedaiToggle: false
    },
    reducers: {
        updateSocialMediaAgency: (state, action) => {
            const PayloadData = action.payload;


            Object.keys(state.SocialMediaAgencyError).forEach((field) => {
                state.SocialMediaAgencyError[field] = false;
            });

            Object.keys(PayloadData).forEach((field) => {
                const value = PayloadData[field];


                if (typeof value === 'string') {
                    const trimmedValue = value.trim();


                    if (trimmedValue === "") {
                        state.SocialMediaAgencyError[field] = true;
                        state.SocialMediaAgencyErrorMessage[field] = `${field} Should Not contain Empty Field`;
                    } else {
                        if (field === 'PrimaryContactNumber') {

                            if (!/^\d{10}$/.test(trimmedValue)) {
                                state.SocialMediaAgencyError[field] = true;
                                state.SocialMediaAgencyErrorMessage[field] = `${field} must be exactly 10 digits`;
                            } else {
                                state.SocialMediaAgencyError[field] = false;
                                state.SocialMediaAgencyErrorMessage[field] = "";
                            }
                        } else if (field === 'PrimaryContactEmail') {

                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                                state.SocialMediaAgencyError[field] = true;
                                state.SocialMediaAgencyErrorMessage[field] = "Email Should Contain '@' , '.com'";
                            } else {
                                state.SocialMediaAgencyErrorMessage[field] = "";
                            }
                        }
                        else if (field === 'PrimaryContactName') {
                            const hasNumber = /[0-9]/.test(value);
                            if (hasNumber) {
                                state.SocialMediaAgencyError[field] = true;
                                state.SocialMediaAgencyErrorMessage[field] = 'PrimaryContactName Should not contain Numbers.';
                            } else {
                                state.SocialMediaAgencyError[field] = false;
                                state.SocialMediaAgencyErrorMessage[field] = "";
                            }
                        }
                    }
                }
            });


            const hasErrors = Object.values(state.SocialMediaAgencyError).some((error) => error === true);

            if (hasErrors) {
                state.AgencyInformation = { HasErrors: hasErrors };
            } else {
                state.AgencyInformation = { ...PayloadData, HasErrors: hasErrors };
            }
        },
        updateSocialMediaAgencyToggle: (state, action) => {
            state.SocialMedaiToggle = action.payload;
        },
        resetSocialMediaAgencyInformation: (state, action) => {
            if (action.payload === true) {
                state.AgencyInformation = {};
                state.SocialMediaAgencyError = {};
                state.SocialMediaAgencyErrorMessage = {};
                state.SocialMedaiToggle = false;
            }
        }
    }
});

export const { updateSocialMediaAgency, updateSocialMediaAgencyToggle, resetSocialMediaAgencyInformation } = SocialMediaAgencySlice.actions;

export default SocialMediaAgencySlice.reducer;