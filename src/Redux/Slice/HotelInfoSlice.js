import { createSlice } from "@reduxjs/toolkit";

const HotelInfoSlice = createSlice({
    name: "hotelInformation",
    initialState: {
        HotelData: {}
    },
    reducers: {
        updateHotelInformation: (state, action) => {
            console.log("Slice Data", action.payload);
            // const isFormComplete = (data) => {
            //     return (
            //         data.HotelName &&
            //         data.MarshaCode &&
            //         data.isTheHotel &&
            //         data.Country &&
            //         data.State &&
            //         data.City &&
            //         data.ZipCode
            //     )
            // }
            // if (isFormComplete(action.payload)) {
                state.HotelData = action.payload;
            // }
        },
    },
})

export const { updateHotelInformation } = HotelInfoSlice.actions;

export default HotelInfoSlice.reducer;