import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isCheckoutOpen: false,
    itemsTotal: 0
};


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        toggleCheckout(state, action) {
            state.isCheckoutOpen = action.payload;
        },

        setItemsTotal(state, action){
            state.itemsTotal = action.payload;
        }
    }
});


export const { toggleCheckout, setItemsTotal } = checkoutSlice.actions;
export default checkoutSlice.reducer;