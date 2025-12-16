import React from "react";
import UnderMaintenance from "../Layouts/UnderMaintenance";
import Sidebar from "../Layouts/Sidebar";
const Report = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
    <Sidebar />
    <div className="ml-64 p-8">
      <UnderMaintenance />
    </div>
  </div>
  );
};

export default Report;