import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FaTachometerAlt,
  FaPlus,
  FaUsers,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navigationItems = [
    { path: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { path: "/profile", label: "Profile", icon: FaUser },
    { path: "/add-expense", label: "Add Expense", icon: FaPlus },
    { path: "/group-expenses", label: "Group Expenses", icon: FaUsers },
    { path: "/my-group", label: "My Groups", icon: FaUsers },
    { path: "/add-income", label: "Add Income", icon: FaPlus },
    { path: "/settings", label: "Settings", icon: IoSettingsOutline },
    { path: "/reports", label: "Reports", icon: FaChartBar },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Navbar (visible on mobile) */}
      <div className="md:hidden flex items-center justify-between bg-white shadow-md px-4 py-3 fixed top-0 left-0 right-0 z-50">
        <div>
          <img
            src="/logo.svg"
            alt="ExpenseEase Logo"
            className="w-full h-10"
          />
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isMobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transform transition-all duration-300 
        ${isCollapsed ? "w-16" : "w-64"} 
        ${isMobileOpen ? "translate-x-0 top-16" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#2ECC71] rounded-full flex items-center justify-center cursor-pointer">
              <img src={user?.profileImage?.url} alt="" className="w-12 h-12 rounded-full" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name?.toUpperCase() || "USER"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || ""}
                </p>
              </div>
            )}
          </div>
          
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)} // Close sidebar after navigation (mobile)
                    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                      isActive(item.path)
                        ? "bg-[#2ECC71] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#2ECC71]"
                    }`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive(item.path)
                          ? "text-white"
                          : "text-gray-500 group-hover:text-[#2ECC71]"
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="ml-3 font-small">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-2">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
              isCollapsed ? "justify-center" : ""
            } text-gray-700 hover:bg-red-100 hover:text-red-600`}
            title={isCollapsed ? "Logout" : ""}
          >
            <FaSignOutAlt className="w-5 h-5 flex-shrink-0 text-red-700 group-hover:text-red-600" />
            {!isCollapsed && (
              <span className="ml-3 font-medium text-red-700 group-hover:text-red-600">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Overlay (mobile only) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
