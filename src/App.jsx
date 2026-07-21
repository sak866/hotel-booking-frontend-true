import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/LogIn";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import HotelList from "./components/HotelList";
import RoomList from "./components/RoomList";
import Booking from "./components/Booking";
import Payment from "./components/Payment";
import MyBooking from "./components/MyBooking";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/rooms/:hotelId" element={<RoomList />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mybookings" element={<MyBooking />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
