import React from 'react';

const WaveDivider = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    version="1.1"
    viewBox="0 0 2560 1440"
    x="0"
    y="0"
  >
    <defs>
      <linearGradient id="waveBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
      <linearGradient id="waveOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Background gradient */}
    <rect width="2560" height="1440" fill="url(#waveBg)" />

    {/* Large primary wave */}
    <path
      fill="url(#waveOverlay)"
      d="M0,200 C640,400 1280,100 1920,300 C2240,400 2560,200 2560,300 L2560,1440 L0,1440 Z"
      opacity="0.8"
    />

    {/* Medium wave */}
    <path
      fill="url(#waveOverlay)"
      d="M0,400 C480,600 960,200 1440,500 C1680,650 1920,400 2160,550 C2400,700 2560,500 2560,600 L2560,1440 L0,1440 Z"
      opacity="0.6"
    />

    {/* Small wave */}
    <path
      fill="url(#waveOverlay)"
      d="M0,600 C320,800 640,400 960,700 C1200,850 1440,600 1680,750 C1920,900 2160,700 2400,850 C2560,950 2560,800 2560,900 L2560,1440 L0,1440 Z"
      opacity="0.4"
    />

    {/* White accent wave */}
    <path
      className="fill-white"
      d="M0,800 C400,1000 800,600 1200,900 C1400,1050 1600,800 1800,950 C2000,1100 2200,900 2400,1050 C2560,1150 2560,1000 2560,1100 L2560,1440 L0,1440 Z"
      opacity="0.3"
    />
  </svg>
);

export default WaveDivider;
