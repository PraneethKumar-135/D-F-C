import { createSlice } from "@reduxjs/toolkit";

const HotelInfoSlice = createSlice({
    name: "hotelInformation",
    initialState: {
        HotelData: {},
        HotelInfoError: {},
        HotelInfoErrorMessage: {},
        HotelPageToggle: false,
        HasErrors: false
    },
    reducers: {
        updateHotelInformation: (state, action) => {
            const PayloadData = action.payload;

            Object.keys(state.HotelInfoError).forEach((field) => {
                state.HotelInfoError[field] = false;
                state.HotelInfoErrorMessage[field] = '';
            });

            Object.keys(PayloadData).forEach((field) => {
                const value = PayloadData[field];

                if (typeof value === 'string') {
                    const trimmedValue = value.trim();

                    if (trimmedValue === "") {
                        state.HotelInfoError[field] = true;
                        state.HotelInfoErrorMessage[field] = `${field} Should Not contain Empty Field`;
                    } else {
                        if (field === 'ZipCode') {
                            if (!/^\d{6}$/.test(trimmedValue)) {
                                state.HotelInfoError[field] = true;
                                state.HotelInfoErrorMessage[field] = `${field} should be a valid 6-digit`;
                            } else {
                                state.HotelInfoErrorMessage[field] = "";
                            }
                        }
                    }
                }
            });

            const hasErrors = Object.values(state.HotelInfoError).some((error) => error === true);

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
        },
        resetHotelInformation: (state, action) => {
            if (action.payload === true) {
                state.HotelData = {};
                state.HotelInfoError = {};
                state.HotelInfoErrorMessage = {};
                state.HotelPageToggle = false;
                state.HasErrors = false
            }
        }

    }
});


export const { updateHotelInformation, updateHotelPageToggle, resetHotelInformation } = HotelInfoSlice.actions;

export default HotelInfoSlice.reducer;