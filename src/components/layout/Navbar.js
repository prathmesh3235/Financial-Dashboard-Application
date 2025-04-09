import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../utils/api';
import { SettingsIcon, NotificationsIcon, ProfileIcon, SearchIcon } from '../../assets/icons/NavbarIcons';

const Navbar = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await api.getUserProfile();
        setUserProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Get title based on current route
  const getTitle = () => {
    if (location.pathname === '/' || location.pathname === '') {
      return 'Overview';
    } else if (location.pathname.includes('/transactions')) {
      return 'Transactions';
    } else if (location.pathname.includes('/accounts')) {
      return 'Accounts';
    } else if (location.pathname.includes('/investments')) {
      return 'Investments';
    } else if (location.pathname.includes('/credit-cards')) {
      return 'Credit Cards';
    } else if (location.pathname.includes('/loans')) {
      return 'Loans';
    } else if (location.pathname.includes('/services')) {
      return 'Services';
    } else if (location.pathname.includes('/privileges')) {
      return 'My Privileges';
    } else if (location.pathname.includes('/settings')) {
      return 'Settings';
    }
    return 'Overview';
  };

  return (
    <nav className="bg-white py-4 px-6 flex items-center justify-between shadow-sm main-navbar">
      {/* Title section */}
      <div className={`flex-shrink-0 ${isMobile ? 'mobile-view-title' : ''}`}>
        <h1 className="text-2xl font-bold">{getTitle()}</h1>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        {/* Search - hide on very small screens */}
        <div className={`relative ${isMobile ? 'hidden sm:block' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            placeholder="Search for something"
            className="pl-10 pr-4 py-2 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 text-sm search-input"
          />
        </div>

        {/* Settings */}
        <button className="text-gray-500 hover:text-gray-700">
          <SettingsIcon />
        </button>

        {/* Notifications */}
        <button className="text-gray-500 hover:text-gray-700 relative">
          <NotificationsIcon />
          {userProfile && userProfile.notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {userProfile.notificationCount}
            </span>
          )}
        </button>

        {/* User profile */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {loading ? (
              <div className="bg-gray-200 animate-pulse w-full h-full"></div>
            ) : (
              userProfile?.avatar ? (
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile?.name || 'User profile'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <ProfileIcon />
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
