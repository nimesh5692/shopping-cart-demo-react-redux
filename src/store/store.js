import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import ordersReducer from './slices/ordersSLice';


const store = configureStore({
    reducer: {
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: ordersReducer
    }
});


export default store;