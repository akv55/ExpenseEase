import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Landing/Home'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import Dashboard from './components/Home/Dashboard'
import AddExpense from './components/Expense/AddExpense';
import Profile from './components/UserProfile/profile'
import ForgotPassword from './components/Login/Forgot';
import VerifyOtp from './components/Login/VerifyOtp';
import ResetPassword from './components/Login/ResetPassword';
import AddIncome from './components/Expense/Add-income';
import Report from './components/Reports/Report';
import GroupExpense from './components/Groups/GroupExpense';
import ProtectedRoute from './components/ProtectedRoute';
import Setting from './pages/Setting';
import CreateGroup from './components/Groups/CreateGroup';
import GroupExpenseDetails from './components/Groups/GroupExpenseDetails';
import TransactionDetails from './components/Groups/TransactionDetails';
import MyKhataBook from './components/MyKhata/MyKhataBook';
import Notification from './components/Notification/Notification';
import TwoFactorVerify from './components/Login/TwoFactorVerify';
import { AuthProvider } from './context/authContext';
import { IncomeProvider } from './context/incomeContext';
import { ExpenseProvider } from './context/expenseContext';
import { GroupProvider } from './context/groupContext';
import { GroupExpenseProvider } from './context/groupExpenseContext';
import UnderMaintenance from './components/Layouts/UnderMaintenance';
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <IncomeProvider>
          <ExpenseProvider>
            <GroupProvider>
              <GroupExpenseProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
                    <Route path="/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-otp" element={<VerifyOtp />} />
                    <Route path="/two-factor" element={<TwoFactorVerify />} />
                    <Route path="/add-income" element={<ProtectedRoute><AddIncome /></ProtectedRoute>} />
                    <Route path="/group-expenses" element={<ProtectedRoute><GroupExpense /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
                    <Route path="/create-group" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
                    <Route path="/group-expense-details/:id" element={<ProtectedRoute><GroupExpenseDetails /></ProtectedRoute>} />
                    <Route path="/group-expense-details/:groupId/expense/:expenseId" element={<ProtectedRoute><TransactionDetails /></ProtectedRoute>} />
                    <Route path="/my-khata" element={<ProtectedRoute><MyKhataBook /></ProtectedRoute>} />
                    <Route path="/notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
                    <Route path="/maintenance" element={<UnderMaintenance />} />
                  </Routes>
                </Router>
              </GroupExpenseProvider>
            </GroupProvider>
          </ExpenseProvider>
        </IncomeProvider>
      </AuthProvider>
    </>
  )
}

export default App
