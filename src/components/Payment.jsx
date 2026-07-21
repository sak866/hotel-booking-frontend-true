import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Payment() {

    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state?.booking;

    const [payment, setPayment] = useState({
        paymentMethod: "UPI",
        paymentDate: "",
        amount: booking?.room?.price || 0
    });

    const handleChange = (e) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });
    };

    const makePayment = async () => {

        const paymentData = {

            hotelBooking: {
                id: booking.id
            },

            paymentMethod: payment.paymentMethod,

            amount: payment.amount,

            paymentDate: payment.paymentDate

        };

        try {

            await api.post(
                "/api/payments/process",
                paymentData
            );

            alert("Payment Successful");

            navigate("/mybookings");

        } catch (error) {

            console.log(error);

            alert("Payment Failed");

        }

    };

    return (

        <div style={{ width: "400px", margin: "50px auto" }}>

            <h2>Payment</h2>

            <h3>Total Amount : ₹ {payment.amount}</h3>

            <label>Payment Method</label>

            <select
                name="paymentMethod"
                value={payment.paymentMethod}
                onChange={handleChange}
            >
                <option>UPI</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Net Banking</option>
            </select>

            <br /><br />

            <label>Payment Date</label>

            <input
                type="date"
                name="paymentDate"
                value={payment.paymentDate}
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={makePayment}>
                Pay Now
            </button>

        </div>

    );

}

export default Payment;
