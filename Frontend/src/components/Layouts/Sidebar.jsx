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
  FaTimes
} from "react-icons/fa";

export default function Sidebar() {
  const { user } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        ${isCollapsed ? 'md:w-16' : 'md:w-64'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="mb-3 px-3">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 bg-[#2ECC71] rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaUser className="w-4 h-4 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name.toUpperCase() || 'USER'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => window.innerWidth < 768 && setIsMobileOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${isActive(item.path)
                      ? 'bg-[#2ECC71] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#2ECC71]'
                      }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-[#2ECC71]'
                      }`} />
                    {!isCollapsed && (
                      <span className="ml-3 font-small">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section & Logout */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${isCollapsed ? 'justify-center' : ''
              } text-gray-700 hover:bg-red-50 hover:text-red-600`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <FaSignOutAlt className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-red-600" />
            {!isCollapsed && (
              <span className="ml-3 font-medium">Logout</span>
            )}
          </button>
        </div>

      </div>
    </>
  );
}
