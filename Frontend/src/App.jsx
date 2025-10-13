import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Landing/Home'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import Dashboard from './components/Home/Dashboard'
import AddExpense from './components/pages/AddExpense';
import Profile from './components/UserProfile/profile'
import MyGroup from './components/pages/MyGroup';
import ForgotPassword from './components/Login/Forgot';
import VerifyOtp from './components/Login/VerifyOtp';
import AddIncome from './components/pages/Add-income';
import Report from './components/pages/Report';
import GroupExpense from './components/pages/GroupExpense';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/my-group" element={<MyGroup />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/group-expenses" element={<GroupExpense/>} />
      </Routes>
    </Router>
  )
}

export default App
