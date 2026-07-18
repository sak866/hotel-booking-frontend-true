import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function RoomList() {

    const { hotelId } = useParams();
    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/hotels/${hotelId}/rooms`
            );

            setRooms(response.data);

        } catch (error) {
            console.log(error);
            alert("Unable to load rooms");
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{ textAlign: "center" }}>
                Available Rooms
            </h1>

            {
                rooms.length === 0 ?

                    <h3 style={{ textAlign: "center" }}>
                        No Rooms Available
                    </h3>

                    :

                    rooms.map((room) => (

                        <div
                            key={room.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                                marginBottom: "20px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h2>{room.roomType}</h2>

                            <p>
                                <b>Price :</b> ₹ {room.price}
                            </p>

                            <p>
                                <b>Status :</b>{" "}
                                {room.available ? "Available" : "Not Available"}
                            </p>

                            <button
                                disabled={!room.available}
                                onClick={() =>
                                    navigate("/booking", {
                                        state: { room }
                                    })
                                }
                            >
                                Book Now
                            </button>

                        </div>

                    ))
            }

        </div>
    );
}

export default RoomList;