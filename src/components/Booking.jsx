import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {

    const location = useLocation();
    const navigate = useNavigate();

    const room = location.state?.room;
    const user = JSON.parse(localStorage.getItem("user"));

    const [booking, setBooking] = useState({
        checkInDate: "",
        checkOutDate: ""
    });

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const confirmBooking = async () => {

        const bookingData = {
            user: {
                id: user.id
            },
            room: {
                id: room.id
            },
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate
        };

        try {

            const response = await api.post(
                "/api/bookings/create",
                bookingData
            );

            alert("Booking Successful");

            navigate("/payment", {
                state: {
                    booking: response.data
                }
            });

        } catch (error) {

            console.log(error);

            alert("Booking Failed");

        }

    };

    return (

        <div style={{ width: "400px", margin: "50px auto" }}>

            <h2>Room Booking</h2>

            <h3>{room.roomType}</h3>

            <h4>Price : ₹ {room.price}</h4>

            <br />

            <label>Check In Date</label>

            <input
                type="date"
                name="checkInDate"
                value={booking.checkInDate}
                onChange={handleChange}
            />

            <br /><br />

            <label>Check Out Date</label>

            <input
                type="date"
                name="checkOutDate"
                value={booking.checkOutDate}
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={confirmBooking}>
                Confirm Booking
            </button>

        </div>

    );

}

export default Booking;
