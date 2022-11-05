import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setItemsTotal, toggleCheckout } from '../store/slices/checkoutSlice';
import { clearCart } from '../store/slices/cartSlice';
import { addOrders } from '../store/slices/ordersSLice';
import Select from 'react-select'
import usersData from '../data/usersData'
import { useState } from 'react';


const Checkout = () => {

    const { isCheckoutOpen, itemsTotal } = useSelector((state) => state.checkout);

    const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState({
        customerId: '',
        customer: '',
        items: [],
        itemsTotal: itemsTotal,
        discount: 0,
        totalPayable: itemsTotal,
        paymentMethod: '',
    });

    useEffect(() => {
        setOrderDetails((prevState) => {
            return {
                ...prevState,
                items: cartItems,
                itemsTotal: itemsTotal
            }
        });
    }, [itemsTotal, cartItems]);

    const handleCloseCheckout = useCallback((close) => {
        dispatch(toggleCheckout(close));
    }, [dispatch]);

    useEffect(() => {
        const docBody = document.body;

        isCheckoutOpen ? (
            docBody.classList.add('overflow_hide')
        ) : (
            docBody.classList.remove('overflow_hide')
        );

    }, [isCheckoutOpen]);

    useEffect(() => {
        const outsideClose = (e) => {
            if (e.target.id === 'checkout') {
                handleCloseCheckout(false);
            }
        };

        window.addEventListener('click', outsideClose);

        return () => {
            window.removeEventListener('click', outsideClose);
        };
    }, [handleCloseCheckout]);

    const handleInputChange = (e) => {
        const inputTarget = e.target;
        const inputName = inputTarget.name;
        const inputValue = inputTarget.value;

        setOrderDetails({
            ...orderDetails,
            [inputName]: inputValue
        });
    };

    useEffect(() => {
        setOrderDetails((prevState) => {
            return{
                ...prevState,
                totalPayable: prevState.itemsTotal - prevState.discount
           }
        });
    }, [orderDetails.discount, orderDetails.itemsTotal]);

    const placeOrder = () => {
        dispatch(addOrders(orderDetails));
        dispatch(setItemsTotal(0));
        setOrderDetails((prevState) => {
            return{
                ...prevState,
                customerId: '',
                customer: '',
                items: [],
                discount: 0,
                paymentMethod: ''
           }
        });
        dispatch(clearCart());
        dispatch(toggleCheckout(false));
        navigate('/orders');
    };

    return (
        <>
            {
                isCheckoutOpen && (
                    <div id="checkout" className="side_pane">
                        <div className="side_pane_content">
                            <div className="side_pane_head">
                                <h2>Checkout</h2>
                                <div
                                    title="Close"
                                    className="close_btn"
                                    onClick={() => handleCloseCheckout(false)}
                                >
                                    <span>&times;</span>
                                </div>
                            </div>

                            <div className="side_pane_body">
                                <br />
                                <div className="checkout_details">
                                    <div className="checkout_details_label">
                                        <label>Customer</label>
                                    </div>
                                    <div className="checkout_details_input">
                                        <Select
                                            onChange={
                                                (selected) => setOrderDetails({
                                                    ...orderDetails,
                                                    customerId:selected.value,
                                                    customer:selected.label
                                                })
                                            }
                                            options={
                                                usersData.map((user) => {
                                                    return ({ value: user.id, label: user.name })
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="checkout_details">
                                    <div className="checkout_details_label">
                                        <label>Items Total (LKR)</label>
                                    </div>
                                    <div className="checkout_details_amount_info">
                                        <b>{orderDetails.itemsTotal}</b>
                                    </div>
                                </div>

                                <div className="checkout_details">
                                    <div className="checkout_details_label">
                                        <label>Discount (LKR)</label>
                                    </div>
                                    <div className="checkout_details_input">
                                        <input type='number' name='discount' onChange={handleInputChange} value={orderDetails.discount} />
                                    </div>
                                </div>

                                <div className="checkout_details">
                                    <div className="checkout_details_label">
                                        <label>Total (LKR)</label>
                                    </div>
                                    <div className="checkout_details_amount_info">
                                        <b>{orderDetails.totalPayable}</b>
                                    </div>
                                </div>

                                <div className="checkout_details">
                                    <div className="checkout_details_label">
                                        <label>Payment method</label>
                                    </div>
                                    <div className="checkout_details_input">
                                        <Select onChange={(selected) => setOrderDetails({...orderDetails, paymentMethod:selected.label})} options={[
                                            { value: 'cash', label: 'Cash' },
                                            { value: 'card', label: 'Card' }
                                        ]} />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="placeorder_btn"
                                    disabled={orderDetails.paymentMethod === '' || orderDetails.customerId === ''}
                                    onClick={() => placeOrder()}
                                >
                                    Place Order
                                </button>
                            </div>

                            <div className="side_pane_foot">
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Checkout;