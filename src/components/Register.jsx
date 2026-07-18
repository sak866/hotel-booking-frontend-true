import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/users/register",
                user
            );

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }
    };

    return (
        <div
            style={{
                width: "400px",
                margin: "80px auto",
                border: "1px solid #ddd",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
        >
            <h2 style={{ textAlign: "center" }}>
                User Registration
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Register
                </button>

            </form>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>

        </div>
    );
}

export default Register;