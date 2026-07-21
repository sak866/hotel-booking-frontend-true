import React, { useEffect, useState } from "react";
import api from "../services/api";

function MyBooking() {

    const [bookings, setBookings] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadBookings();
    }, []);
    
    const loadBookings = async () => {
    try {

        const response = await api.get(
            `/api/bookings/user/${user.id}`
        );

        setBookings(response.data);

    } catch (error) {

        console.log(error);

        alert("Unable to load bookings");

    }
};

   const cancelBooking = async (bookingId) => {

    const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

        await api.put(
            `/api/bookings/cancel/${bookingId}`
        );

        alert("Booking Cancelled Successfully");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Unable to Cancel Booking");

    }

};

    return (

        <div style={{ padding: "30px" }}>

            <h1 style={{ textAlign: "center" }}>
                My Bookings
            </h1>

            {
                bookings.length === 0 ?

                    <h3 style={{ textAlign: "center" }}>
                        No Bookings Found
                    </h3>

                    :

                    bookings.map((booking) => (

                        <div
                            key={booking.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                borderRadius: "10px",
                                marginBottom: "20px"
                            }}
                        >

                            <h3>Booking ID : {booking.id}</h3>

                            <p>
                                <b>Room :</b> {booking.room?.roomType}
                            </p>

                            <p>
                                <b>Check In :</b> {booking.checkInDate}
                            </p>

                            <p>
                                <b>Check Out :</b> {booking.checkOutDate}
                            </p>
                            <button
    style={{
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer"
    }}
    onClick={() => cancelBooking(booking.id)}
>
    Cancel Booking
</button>

                        </div>

                    ))

            }

        </div>

    );

}

export default MyBooking;
