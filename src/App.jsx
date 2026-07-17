import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Stepper from "./components/Stepper";
import SearchPage from "./pages/SearchPage";
import RoomsPage from "./pages/RoomsPage";
import GuestPage from "./pages/GuestPage";
import ReviewPage from "./pages/ReviewPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { BookingProvider } from "./context/BookingContext";

function Layout() {
  const location = useLocation();
  const isConfirmation = location.pathname.startsWith("/confirmation");

  return (
    <div className="min-h-screen w-full bg-ink-deep text-paper flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <Header />
        {!isConfirmation && <Stepper currentPath={location.pathname} />}

        <div className="mt-6 bg-paper text-ink rounded-2xl shadow-2xl overflow-hidden">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/guest" element={<GuestPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/confirmation/:code" element={<ConfirmationPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <Layout />
    </BookingProvider>
  );
}
