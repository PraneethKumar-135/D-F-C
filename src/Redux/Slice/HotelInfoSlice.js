import { createSlice } from "@reduxjs/toolkit";

const HotelInfoSlice = createSlice({
    name: "hotelInformation",
    initialState: {
        HotelData: {},
        PersonalInfoError: {
            HotelName: false,
            MarshaCode: false,
            isTheHotel: false,
            Country: false,
            State: false,
            City: false,
            ZipCode: false
        },
        HotelPageToggle: false,
        HasErrors: false
    },
    reducers: {
        updateHotelInformation: (state, action) => {
            const PayloadData = action.payload;

            Object.keys(state.PersonalInfoError).forEach((field) => {
                state.PersonalInfoError[field] = !PayloadData[field];
            });

            const hasErrors = Object.values(state.PersonalInfoError).some((error) => error === true);

            if (hasErrors) {
                state.HasErrors = true;
                state.HotelData = {
                    HasErrors: true,
                };
            } else {
                state.HasErrors = false;
                state.HotelData = {
                    ...PayloadData,
                    HasErrors: false,
                };
            }
        },
        updateHotelPageToggle: (state, action) => {
            state.HotelPageToggle = action.payload;
        }
    }
});


export const { updateHotelInformation, updateHotelPageToggle } = HotelInfoSlice.actions;

export default HotelInfoSlice.reducer;