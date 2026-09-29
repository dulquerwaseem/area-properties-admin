import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Logo from "./components/Logo";
import ListingsPage from "./pages/ListingsPage";
import WizardPage from "./pages/WizardPage";
import { SF, MOCK_LISTINGS } from "./lib/constants";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const navigate = useNavigate();

  function handlePublish(newListing) {
    setListings((prev) => [newListing, ...prev]);
    navigate("/listings");
  }

  return (
    <div style={{ fontFamily: SF }} className="min-h-screen bg-white text-neutral-900 md:flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 min-w-0">
        <div className="md:hidden h-14 flex items-center px-4 border-b border-neutral-100 sticky top-0 bg-white z-30">
          <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 text-neutral-700"><Menu className="w-5 h-5" /></button>
          <div className="ml-2"><Logo small /></div>
        </div>
        <div className="p-5 sm:p-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<Navigate to="/listings" replace />} />
            <Route path="/listings" element={<ListingsPage listings={listings} onAdd={() => navigate("/wizard")} />} />
            <Route path="/wizard" element={<WizardPage onPublish={handlePublish} onCancel={() => navigate("/listings")} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
