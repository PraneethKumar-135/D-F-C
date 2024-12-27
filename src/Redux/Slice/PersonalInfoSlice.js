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
            const PayloadData = action.payload;

           
            Object.keys(state.PersonalInfoError).forEach((field) => {
                state.PersonalInfoError[field] = false; 
            });

            Object.keys(PayloadData).forEach((field) => {
                const value = PayloadData[field].trim();

             
                if (value === "") {
                    state.PersonalInfoError[field] = true; 
                    state.PersonalInfoErrorMessage[field] = `${field} Should Not contain Empty Field`; 
                } else {
                    
                    if (field === 'Eid') {
                        
                        
                        const hasLetter = /[a-zA-Z]/.test(value);
                        const hasNumber = /[0-9]/.test(value);

                        if (!hasLetter || !hasNumber) {
                            state.PersonalInfoError[field] = true; 
                            state.PersonalInfoErrorMessage[field] = "Employee Id is Wrong Formate. Eg(EID123)."; 
                        }
                        else {
                            state.PersonalInfoErrorMessage[field] = ""; 
                        }
                    } else if (field === 'PhoneNumber') {
                        

                        if (!/^\d{10}$/.test(value)) {
                            state.PersonalInfoError[field] = true;
                            state.PersonalInfoErrorMessage[field] = "Phone Number must be exactly 10 digits"; 
                        } else {
                            state.PersonalInfoError[field] = false; 
                            state.PersonalInfoErrorMessage[field] = ""; 
                        }
                    } else if (field === 'Email') {
                       
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            state.PersonalInfoError[field] = true; 
                            state.PersonalInfoErrorMessage[field] = "Email Should Contain '@' , '.'"; 
                        } else {
                            state.PersonalInfoErrorMessage[field] = ""; 
                        }
                    }
                }
            });

            const hasErrors = Object.values(state.PersonalInfoError).some((error) => error === true);

            if (hasErrors) {
                state.currentPage = 1;
                state.buttonClick = false; 
            } else {
                state.PersonalInfoData = PayloadData;
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
    updatebuttonClick
} = PersonalInfoSlice.actions;

export default PersonalInfoSlice.reducer;