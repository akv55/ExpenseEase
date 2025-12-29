import { useState } from "react";
import SettingsSidebar from "../components/Settings/SettingsSidebar";
import Sidebar from "../components/Layouts/Sidebar";
import ProfileSettings from "../components/Settings/ProfileSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";
import ExpenseSettings from "../components/Settings/ExpenseSettings";
import SplitRulesSettings from "../components/Settings/SplitRulesSettings";
import NotificationSettings from "../components/Settings/NotificationSettings";
// import CurrencySettings from "../components/Settings/CurrencySettings";
// import PaymentSettings from "../components/Settings/PaymentSettings";
// import ReportSettings from "../components/Settings/ReportSettings";
import AppearanceSettings from "../components/Settings/AppearanceSettings";
// import BackupSettings from "../components/Settings/BackupSettings";
import DangerZone from "../components/Settings/DangerZone";

export default function Settings() {
  const [active, setActive] = useState("Profile");

  const renderSection = () => {
    switch (active) {
      case "Profile": return <ProfileSettings />;
      case "Security": return <SecuritySettings />;
      case "Expense": return <ExpenseSettings />;
      case "Split Rules": return <SplitRulesSettings />;
      case "Notifications": return <NotificationSettings />;
      // case "Currency": return <CurrencySettings />;
      // case "Payments": return <PaymentSettings />;
      // case "Reports": return <ReportSettings />;
      case "Appearance": return <AppearanceSettings />;
      // case "Backup": return <BackupSettings />;
      case "Danger Zone": return <DangerZone />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="md:ml-64 ml-0 p-4 md:p-8">
        <div className="max-w-7xl mx-auto group-container">
          <div className="flex flex-col md:flex-row">
            <SettingsSidebar active={active} setActive={setActive} />
            <main className="flex-1 p-4 md:p-8">
              <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
                {renderSection()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
