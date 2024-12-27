import { createSlice } from "@reduxjs/toolkit";

const socialMediaSlice = createSlice({
    name: 'socialMediaInfo',
    initialState: {
        SocialMediaInformation: {},
        SocialMediaErrors: {},
        SocialMediaErrorMessages: {},
        SaveButton: false,
    },
    reducers: {
        updateSocialMediaAccounts: (state, action) => {
            const { platform, field, value } = action.payload;

           
            if (!state.SocialMediaInformation[platform]) {
                state.SocialMediaInformation[platform] = {};
                state.SocialMediaErrors[platform] = {};
                state.SocialMediaErrorMessages[platform] = {};
            }

          
            state.SocialMediaInformation[platform][field] = value;

            delete state.SocialMediaErrors[platform][field];
            delete state.SocialMediaErrorMessages[platform][field];

      
            switch (field) {
                case 'sma_email':
                    if (!value) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Email is required.';
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Email format is invalid.';
                    }
                    break;

                case 'sma_phone':
                    if (!value) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Phone number is required.';
                    } else if (!/^\d{10}$/.test(value)) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Phone number must be exactly 10 digits.';
                    }
                    break;

                case 'sma_name':
                    if (!value) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Agency name is required.';
                    }
                    break;

                case 'sma_person':
                    if (!value) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Contact person name is required.';
                    }
                    break;

                case 'pageURL':
                    if (!value) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Page URL is required.';
                    } else if (!/^https:\/\/www\..*\.com(\/.*)?$/.test(value)) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'URL must start with "https://www." and end with ".com".';
                    }
                    break;

                case 'pageID':
                    if (!value) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Page ID is required.';
                    }
                    break;

                case 'added_dcube':
                    if (!value || value === null || value === undefined) {
                        state.SocialMediaErrors[platform][field] = true;
                        state.SocialMediaErrorMessages[platform][field] = 'Please select if this agency has added DCube.';
                    }
                    break;

                case 'mi_fbm':
                    if (value === true) {
                        state.SocialMediaInformation[platform].added_dcube = true;
                        delete state.SocialMediaErrors[platform].added_dcube;
                        delete state.SocialMediaErrorMessages[platform].added_dcube;
                    } else if (value === false) {
                        state.SocialMediaInformation[platform].added_dcube = null; 
                        state.SocialMediaErrorMessages[platform].added_dcube = 'Please select if this agency has added DCube.';
                    }
                    break;

                default:
                    break;
            }

           
            const allPlatformsValid = Object.keys(state.SocialMediaInformation).every((platformKey) => {
                const platformData = state.SocialMediaInformation[platformKey] || {};
                const platformErrors = state.SocialMediaErrors[platformKey] || {};

            
                const requiredFields = ['sma_email', 'sma_phone', 'sma_name', 'sma_person', 'pageURL', 'pageID', 'added_dcube'];
                const allFieldsFilled = requiredFields.every((field) => platformData[field] !== undefined && platformData[field] !== null && platformData[field] !== '');

               
                const noErrors = Object.values(platformErrors).every((error) => !error);

                return allFieldsFilled && noErrors;
            });

            
            state.SaveButton = allPlatformsValid;

        },
    },
});

export const { updateSocialMediaAccounts } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
