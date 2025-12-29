import { useAuth } from '../context/authContext.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-center max-w-7xl mx-auto group-container">
					<div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-4">
					</div>
					<h3 className="text-xl font-semibold text-teal-600">Loading
            <span className="animate-pulse">.</span><span className="animate-pulse delay-150">.</span><span className="animate-pulse delay-300">.</span>
          </h3>
          <p>Please wait while we fetch your data.</p>
				</div>
			</div>
		);
	}

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;