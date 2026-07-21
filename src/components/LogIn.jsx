import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/api/users/login",
                login
            );

            localStorage.setItem("user", JSON.stringify(response.data));

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Unable to connect to server");
            }

        }

    };

    return (

        <div
            style={{
                width: "400px",
                margin: "80px auto",
                padding: "25px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 0 10px gray"
            }}
        >

            <h2 style={{ textAlign: "center" }}>
                Hotel Booking Login
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={login.email}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px"
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={login.password}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </form>

            <br />

            <p style={{ textAlign: "center" }}>
                Don't have an account?
                <Link to="/register"> Register</Link>
            </p>

        </div>

    );

}

export default Login;
