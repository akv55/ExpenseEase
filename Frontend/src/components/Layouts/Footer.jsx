import React from "react";
import { Link } from "react-router-dom";
import logoIcon from "../../../public/icon.svg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-teal-900/40 bg-slate-950 text-slate-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-3 mb-3">
              <div className="relative h-9 w-9 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src={logoIcon}
                  alt="ExpenseEase icon"
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-base font-semibold text-white tracking-tight">
                  ExpenseEase
                </p>
                <p className="text-[11px] text-teal-100/80 uppercase tracking-[0.22em]">
                  Split • Track • Relax
                </p>
              </div>
            </Link>
            <p className="text-xs text-slate-300/90 leading-relaxed">
              A simple way to keep shared expenses, personal budgets and everyday
              spending organised—so you focus more on moments and less on money math.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-xs font-semibold text-slate-100 uppercase tracking-[0.18em] mb-3">
                Product
              </p>
              <ul className="space-y-2 text-slate-300/90">
                <li>
                  <a href="/#features" className="hover:text-teal-300 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/#how-it-works" className="hover:text-teal-300 transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-teal-300 transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-100 uppercase tracking-[0.18em] mb-3">
                Company
              </p>
              <ul className="space-y-2 text-slate-300/90">
                <li>
                  <a href="/#why-us" className="hover:text-teal-300 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <Link to="/notifications" className="hover:text-teal-300 transition-colors">
                    Updates
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="hover:text-teal-300 transition-colors">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold text-slate-100 uppercase tracking-[0.18em] mb-3">
                Legal
              </p>
              <ul className="space-y-2 text-slate-300/90">
                <li>
                  <button className="hover:text-teal-300 transition-colors text-left w-full">
                    Privacy policy
                  </button>
                </li>
                <li>
                  <button className="hover:text-teal-300 transition-colors text-left w-full">
                    Terms of use
                  </button>
                </li>
                <li>
                  <button className="hover:text-teal-300 transition-colors text-left w-full">
                    Cookies
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
          <p>
            © {year} ExpenseEase. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Follow us</span>
            <div className="flex space-x-2">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-slate-200 hover:bg-teal-500 hover:text-white transition-colors border border-slate-700/80"
              >
                <FaFacebookF className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-slate-200 hover:bg-teal-500 hover:text-white transition-colors border border-slate-700/80"
              >
                <FaTwitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-slate-200 hover:bg-teal-500 hover:text-white transition-colors border border-slate-700/80"
              >
                <FaInstagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-slate-200 hover:bg-teal-500 hover:text-white transition-colors border border-slate-700/80"
              >
                <FaLinkedinIn className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
