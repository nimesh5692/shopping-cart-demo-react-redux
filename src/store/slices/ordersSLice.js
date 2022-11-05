import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    orders: [],
};


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrders(state, action) {
            state.orders.push(action.payload);
        },
    }
});


export const { addOrders } = ordersSlice.actions;
export default ordersSlice.reducer;