import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Layouts/Footer';
import { FaWallet, FaUsers, FaChartLine, FaShieldAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaWallet className="text-4xl text-blue-600" />,
      title: "Smart Expense Tracking",
      description: "Log expenses effortlessly with our intuitive interface. Categorize transactions automatically and add receipts with photo capture.",
      benefits: ["Auto-categorization", "Receipt scanning", "Voice notes"]
    },
    {
      icon: <FaUsers className="text-4xl text-green-600" />,
      title: "Group Expense Splitting",
      description: "Split bills and expenses with friends, family, or roommates. Create groups, track shared expenses, and settle up instantly.",
      benefits: ["Multiple split methods", "Group chat", "Settlement tracking"]
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-600" />,
      title: "Advanced Analytics & Reports",
      description: "Get detailed insights into your spending patterns with interactive charts, monthly reports, and budget vs actual analysis.",
      benefits: ["Visual dashboards", "Monthly reports", "Spending trends"]
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-600" />,
      title: "Bank-Level Security",
      description: "Your financial data is protected with 256-bit encryption, secure authentication, and regular security audits.",
      benefits: ["End-to-end encryption", "Two-factor auth", "Data privacy"]
    },
    {
      icon: <FaCheckCircle className="text-4xl text-orange-600" />,
      title: "Budget Planning & Goals",
      description: "Set spending limits, create savings goals, and receive alerts when you're approaching your budget limits.",
      benefits: ["Custom budgets", "Goal tracking", "Smart alerts"]
    },
    {
      icon: <FaArrowRight className="text-4xl text-teal-600" />,
      title: "Multi-Device Sync",
      description: "Access your expenses anywhere with seamless synchronization across web, mobile, and desktop platforms.",
      benefits: ["Real-time sync", "Offline mode", "Cross-platform"]
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your free account in minutes."
    },
    {
      step: "2",
      title: "Add Expenses",
      description: "Track your spending and categorize transactions."
    },
    {
      step: "3",
      title: "Split & Share",
      description: "Create groups and split expenses with others."
    },
    {
      step: "4",
      title: "Monitor & Save",
      description: "View reports and take control of your finances."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Simplify Your Spending Effortlessly<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Split & Track</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Manage personal expenses, split bills with friends, and gain financial clarity in one intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-2 text-lg"
              >
                Get Started Free <FaArrowRight />
              </Link>
              <Link
                to="/login"
                className="bg-white text-gray-900 border-2 border-gray-300 hover:border-blue-500 font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg text-lg"
              >
                Sign In
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">25K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">₹5M+</div>
                <div className="text-gray-600">Expenses Tracked</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">100K+</div>
                <div className="text-gray-600">Groups Created</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the tools and capabilities that make SpendWise the ultimate expense tracking solution for individuals and groups
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their financial habits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "SpendWise has completely changed how I manage my business expenses. The group splitting feature is a lifesaver for client projects!"
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike Chen</h4>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The analytics are incredible. I finally understand where my money goes each month. Highly recommend for anyone serious about budgeting."
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Anna Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Perfect for our household budget. We use it to track groceries, utilities, and even split vacation costs with friends. So easy to use!"
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances smarter with SpendWise.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-2 text-lg"
          >
            Start Your Journey <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about getting started with SpendWise
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Is SpendWise really free to use?</h3>
              <p className="text-gray-600">Yes! SpendWise offers a free plan with all essential features. Premium features are available for power users who need advanced analytics and unlimited groups.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How secure is my financial data?</h3>
              <p className="text-gray-600">We use bank-level 256-bit encryption and follow industry security standards. Your data is never shared with third parties, and we conduct regular security audits.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Can I export my expense data?</h3>
              <p className="text-gray-600">Absolutely! You can export your data in CSV, PDF, or Excel formats. Premium users also get access to API integration for custom exports.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Does SpendWise work offline?</h3>
              <p className="text-gray-600">Yes, you can view and add expenses offline. All changes will sync automatically when you reconnect to the internet.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;