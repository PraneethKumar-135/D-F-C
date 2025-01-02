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
        PersonalInfoErrorMessage: {},
    },
    reducers: {
        updatePersonalInformation: (state, action) => {
            const { field, value } = action.payload;
            
            // Reset error for the current field
            state.PersonalInfoError[field] = false;
            state.PersonalInfoErrorMessage[field] = "";
            
            // Validate the current field
            if (value.trim() === "") {
                state.PersonalInfoError[field] = true;
                state.PersonalInfoErrorMessage[field] = `${field} Should Not contain Empty Field`;
            } else {
                switch (field) {
                    case 'FirstName':
                    case 'LastName': {
                        const hasNumber = /[0-9]/.test(value);
                        if (hasNumber) {
                            state.PersonalInfoError[field] = true;
                            state.PersonalInfoErrorMessage[field] = `${field} Should not contain Numbers.`;
                        }
                        break;
                    }
                    case 'Eid': {
                        const hasLetter = /[a-zA-Z]/.test(value);
                        const hasNumber = /[0-9]/.test(value);
                        
                        if (!hasLetter || !hasNumber) {
                            state.PersonalInfoError[field] = true;
                            state.PersonalInfoErrorMessage[field] = "Employee Id is Wrong Format. Eg(ABC123).";
                        }
                        break;
                    }
                    case 'PhoneNumber': {
                        if (!/^\d{10}$/.test(value)) {
                            state.PersonalInfoError[field] = true;
                            state.PersonalInfoErrorMessage[field] = "Phone Number must be exactly 10 digits";
                        }
                        break;
                    }
                    case 'Email': {
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            state.PersonalInfoError[field] = true;
                            state.PersonalInfoErrorMessage[field] = "Email Should Contain '@' , '.com'";
                        }
                        break;
                    }
                    default:
                        // No specific validation for other fields
                        break;
                }
            }
            
            // Update the field in PersonalInfoData
            state.PersonalInfoData = {
                ...state.PersonalInfoData,
                [field]: value
            };
            
            // Check if all required fields are filled and valid
            const requiredFields = ['FirstName', 'LastName', 'Title', 'Email', 'Eid', 'CountryCode', 'PhoneNumber'];
            const allFieldsFilled = requiredFields.every(field => 
                state.PersonalInfoData[field] && 
                state.PersonalInfoData[field].toString().trim() !== ''
            );
            
            const hasErrors = Object.values(state.PersonalInfoError).some(error => error === true);
            
            // Update page and button state based on validation
            if (hasErrors || !allFieldsFilled) {
                state.currentPage = 1;
                state.buttonClick = false;
            } else {
                state.currentPage = 2;
                state.buttonClick = true;
            }
        },
        updatedCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        editMainPage: (state, action) => {
            state.PageToogle = action.payload;
        },
        updatebuttonClick: (state, action) => {
            state.buttonClick = action.payload;
        },
        resetPersonalInformation: (state, action) => {

            if (action.payload === true) {
                state.PersonalInfoData = {};
                state.currentPage = 1;
                state.PageToogle = false;
                state.buttonClick = false;
                state.PersonalInfoError = {};
                state.PersonalInfoErrorMessage = {}
            }
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
    updatebuttonClick,
    resetPersonalInformation
} = PersonalInfoSlice.actions;

export default PersonalInfoSlice.reducer;