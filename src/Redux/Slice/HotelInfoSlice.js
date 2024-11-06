import { createSlice } from "@reduxjs/toolkit";

const HotelInfoSlice = createSlice({
    name: "hotelInformation",
    initialState: {
        HotelData: {}
    },
    reducers: {
        updateHotelInformation: (state, action) => {
            console.log(action.payload);
            state.HotelData = action.payload
        },
    },
})

export const { updateHotelInformation } = HotelInfoSlice.actions;

export default HotelInfoSlice.reducer;