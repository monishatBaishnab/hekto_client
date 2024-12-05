import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Client = () => {
  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Main Contents */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Client;
