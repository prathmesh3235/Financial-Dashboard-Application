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
  
  // Hamburger menu icon component
  const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  return (
    <>
      <nav className="bg-white py-4 px-6 flex items-center justify-between shadow-sm main-navbar">
        {/* Left side - hamburger menu on mobile */}
        {isMobile && (
          <button className="text-gray-700">
            <HamburgerIcon />
          </button>
        )}

        {/* Title section - centered on mobile */}
        <div className={`${isMobile ? 'flex-1 text-center' : 'flex-shrink-0'}`}>
          <h1 className="text-2xl font-bold text-indigo-900">{getTitle()}</h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-6">
          {/* Search - only visible on desktop */}
          {!isMobile && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input 
                type="text" 
                placeholder="Search for something"
                className="pl-10 pr-4 py-2 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 text-sm search-input"
              />
            </div>
          )}

          {/* Settings and notifications - only on desktop */}
          {!isMobile && (
            <>
              <button className="text-gray-500 hover:text-gray-700">
                <SettingsIcon />
              </button>

              <button className="text-gray-500 hover:text-gray-700 relative">
                <NotificationsIcon />
                {userProfile && userProfile.notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {userProfile.notificationCount}
                  </span>
                )}
              </button>
            </>
          )}

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
      
      {/* Mobile search bar below navbar */}
      {isMobile && (
        <div className="bg-white px-4">
          <div className="relative w-full border border-gray-100 rounded-full overflow-hidden bg-gray-50 my-2">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Search for something"
              className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none text-gray-400 text-sm"
              style={{ border: 'none', boxShadow: 'none' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;