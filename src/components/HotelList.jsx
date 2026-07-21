import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function HotelList() {

    const [hotels, setHotels] = useState([]);
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadHotels();
    }, []);

    // Load All Hotels
    const loadHotels = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/hotels"
            );

            setHotels(response.data);

        } catch (error) {
            console.log(error);
            alert("Unable to load hotels.");
        }
    };

    // Search Hotels
    const searchHotels = async () => {

        if (location.trim() === "") {
            loadHotels();
            return;
        }

        try {

            const response = await api.get(
                `/api/hotels/search?location=${location}`
            );

            setHotels(response.data);

        } catch (error) {

            console.log(error);
            alert("Search Failed");

        }

    };

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{ textAlign: "center" }}>
                Hotel List
            </h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "25px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search by Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "250px"
                    }}
                />

                <button onClick={searchHotels}>
                    Search
                </button>

                <button onClick={loadHotels}>
                    Reset
                </button>

            </div>

            {
                hotels.length === 0 ?

                    <h3 style={{ textAlign: "center" }}>
                        No Hotels Found
                    </h3>

                    :

                    hotels.map((hotel) => (

                        <div
                            key={hotel.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                                marginBottom: "20px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h2>{hotel.name}</h2>

                            <p>
                                <b>Location:</b> {hotel.location}
                            </p>

                            <p>
                                <b>Description:</b> {hotel.description}
                            </p>

                            <p>
                                <b>Rating:</b> ⭐ {hotel.rating}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(`/rooms/${hotel.id}`)
                                }
                            >
                                View Rooms
                            </button>

                        </div>

                    ))

            }

        </div>
    );
}

export default HotelList;
