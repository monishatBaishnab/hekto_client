import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Client = () => {
  return (
    <div>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Main Contents */}
      <Outlet />

      {/* Footer */}
      <div></div>
    </div>
  );
};

export default Client;
