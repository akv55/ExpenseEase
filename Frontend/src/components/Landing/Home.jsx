import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Layouts/Footer';
import WaveDivider from './waveDivider';
import { FaWallet, FaUsers, FaChartLine, FaShieldAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaWallet className="text-4xl text-teal-600" />,
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
      title: "Real-Time Notifications & Alerts",
      description: "Stay informed with instant notifications for new expenses, upcoming due dates, and budget limits to help you stay on track.",
      benefits: ["Custom alerts", "Push notifications", "Email summaries"]
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
      {/* Hero Section with Navbar */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900">
        {/* Wave background */}
        <div className="absolute inset-0 opacity-70 pointer-events-none">
          <WaveDivider />
        </div>

        <div className="relative z-10">
          {/* Navbar */}
          <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src="/icon.svg"
                  alt="ExpenseEase icon"
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-white tracking-tight group-hover:text-teal-100 transition-colors">
                  ExpenseEase
                </p>
                <p className="text-xs text-teal-100/70 uppercase tracking-[0.2em]">
                  Spend Smarter
                </p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-teal-100/80">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
              <a href="#why-us" className="hover:text-white transition-colors">Why ExpenseEase</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white/90 hover:text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-flex px-4 sm:px-5 py-2.5 text-sm font-semibold rounded-xl bg-white text-teal-700 shadow-lg shadow-teal-900/30 hover:bg-teal-50 transition-all"
              >
                Get started
              </Link>
            </div>
          </header>

          {/* Hero content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-14 lg:pt-24 flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/15 mb-6 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs font-medium text-teal-50/90">
                  New: Group expenses, budgets & smart alerts
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Take control of
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-200 to-sky-300">
                  every expense, together.
                </span>
              </h1>
              <p className="text-base md:text-lg text-teal-50/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                ExpenseEase helps you track personal spending, split group bills, and
                stay ahead of your money with clear, real‑time insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch mb-6">
                <Link
                  to="/signup"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-teal-900/30 hover:bg-teal-50 hover:shadow-xl transition-all text-base"
                >
                  Start for free
                  <FaArrowRight className="text-teal-700" />
                </Link>
                <Link
                  to="/login"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center border border-white/20 text-white/90 hover:text-white hover:bg-white/5 font-medium py-3.5 px-8 rounded-xl backdrop-blur transition-all text-base"
                >
                  Sign in to your workspace
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-left justify-center lg:justify-start">
                <div>
                  <p className="text-xl font-semibold text-white">15K+</p>
                  <p className="text-xs text-teal-100/80">expenses tracked every month</p>
                </div>
                <div className="h-10 w-px bg-white/15" />
                <div>
                  <p className="text-xl font-semibold text-white">4.8★</p>
                  <p className="text-xs text-teal-100/80">Loved by roommates, teams & families</p>
                </div>
              </div>
            </div>

            {/* Hero mockup card */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" />
                <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />

                <div className="relative rounded-3xl bg-slate-950/70 border border-white/10 shadow-2xl backdrop-blur-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-slate-300">This month</p>
                      <p className="text-2xl font-semibold text-emerald-200">₹42,380</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      ▲ 18% smarter
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-2xl bg-slate-900/80 border border-slate-700/60 p-3">
                      <p className="text-xs text-slate-300 mb-1">Groups</p>
                      <p className="text-lg font-semibold text-slate-50">3 active</p>
                      <p className="text-[11px] text-emerald-300 mt-1">₹9,250 to settle</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-sky-500/20 border border-emerald-300/40 p-3">
                      <p className="text-xs text-emerald-100 mb-1">Budget left</p>
                      <p className="text-lg font-semibold text-white">₹12,600</p>
                      <div className="mt-2 h-1.5 w-full bg-emerald-900/40 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-emerald-300 to-sky-300" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {['Groceries', 'Rent split', 'Weekend trip'].map((label, index) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-2xl bg-slate-900/80 border border-slate-800/80 px-3 py-2.5 text-xs text-slate-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400/70 to-cyan-400/70 flex items-center justify-center text-[11px] font-semibold text-slate-950">
                            {index + 1}
                          </span>
                          <span>{label}</span>
                        </div>
                        <span className="text-slate-300">₹{index === 0 ? '4,320' : index === 1 ? '18,000' : '7,560'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the tools that make ExpenseEase the ultimate expense tracking solution for individuals and groups.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-50 hover:border-teal-200"
              >
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-2xl bg-teal-500/10 blur-sm" />
                <div className="mb-6 flex items-center justify-center relative z-10">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center relative z-10">{feature.title}</h3>
                <p className="text-gray-600 mb-5 leading-relaxed text-sm relative z-10">{feature.description}</p>
                <div className="space-y-1.5 relative z-10">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-xs text-gray-700">
                      <FaCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
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
      <div id="how-it-works" className="py-20 bg-gradient-to-r from-gray-50 to-teal-50">
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
                <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div id="why-us" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built for real life money moments.
              </h2>
              <p className="text-gray-600 mb-6">
                From shared apartments and weekend trips to office lunches and family budgets, ExpenseEase keeps
                everyone on the same page—without awkward conversations.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-semibold text-emerald-700">✓</span>
                  <span>Crystal‑clear who owes what, at any time.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-semibold text-emerald-700">✓</span>
                  <span>Friendly reminders so you never forget to settle up.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-semibold text-emerald-700">✓</span>
                  <span>Designed to be fast, simple and delightful on every device.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-sky-50 p-6 shadow-sm">
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-[0.18em] mb-3">
                What our users say
              </p>
              <blockquote className="text-gray-800 text-sm md:text-base mb-4">
                “ExpenseEase has completely removed the stress of tracking rent, utilities and random shared expenses
                with my flatmates. Everyone just adds receipts and the app does the rest.”
              </blockquote>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Aarav, Bengaluru</p>
                  <p className="text-xs text-gray-500">Uses ExpenseEase with 4 roommates</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Avg. monthly time saved</p>
                  <p className="text-xl font-semibold text-teal-700">6 hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;