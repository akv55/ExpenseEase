import React from "react";
import Sidebar from "../Layouts/Sidebar";
import UnderMaintenance from "../Layouts/UnderMaintenance";
const MyGroup = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
        <Sidebar />
        <div className="ml-64 p-8">
          <UnderMaintenance/>
        </div>
      </div>
    </>
  );
}

export default MyGroup;