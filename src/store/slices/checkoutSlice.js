import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isCheckoutOpen: false,
    itemsTotal: 0,
    discount: 0,
    totalPayable: 0
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
        },

        setDiscount(state, action){
            state.discount = action.payload;
        },

        setTotalPayable(state, action){
            state.totalPayable = action.payload;
        }
    }
});


export const { toggleCheckout, setItemsTotal } = checkoutSlice.actions;
export default checkoutSlice.reducer;