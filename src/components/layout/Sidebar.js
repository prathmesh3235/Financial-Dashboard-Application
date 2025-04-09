import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if mobile screen on initial load and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setCollapsed(window.innerWidth < 768);
    };
    
    // Set initial state
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Menu items with icons
  const menuItems = [
    {
      name: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/',
    },
    {
      name: 'Transactions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      path: '/transactions',
    },
    {
      name: 'Accounts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: '/accounts',
    },
    {
      name: 'Investments',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/investments',
    },
    {
      name: 'Credit Cards',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      path: '/credit-cards',
    },
    {
      name: 'Loans',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/loans',
    },
    {
      name: 'Services',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/services',
    },
    {
      name: 'My Privileges',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      path: '/privileges',
    },
    {
      name: 'Setting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/settings',
    },
  ];

  // Mobile hamburger button for sidebar toggle
  const HamburgerButton = () => (
    <button 
      className={`md:hidden fixed top-4 left-4 z-30 text-[#36406A] hamburger-btn`}
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      aria-label="Toggle menu"
    >
      {!mobileMenuOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </button>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <HamburgerButton />
      
      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`bg-white h-screen fixed md:relative transition-all duration-300 shadow-md z-20 sidebar-transition mobile-sidebar
          ${collapsed && !mobileMenuOpen ? 'w-16' : mobileMenuOpen ? 'w-16' : 'w-64'}
          ${mobileMenuOpen ? 'left-0 mobile-menu-open' : '-left-64 md:left-0'}
        `}
      >
        {/* Only show header on desktop or expanded mobile menu */}
        {!mobileMenuOpen && (
          <div className="py-5 px-5 flex items-center border-b border-gray-100">
            <div className="w-6 h-7 mr-3 flex-shrink-0">
              <svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H16.5C16.5 2.20435 16.1839 1.44129 15.6213 0.87868C15.0587 0.31607 14.2956 0 13.5 0H10.5C9.70435 0 8.94129 0.31607 8.37868 0.87868C7.81607 1.44129 7.5 2.20435 7.5 3H5C3.67392 3 2.40215 3.52678 1.46447 4.46447C0.526784 5.40215 0 6.67392 0 8V23C0 24.3261 0.526784 25.5979 1.46447 26.5355C2.40215 27.4732 3.67392 28 5 28H19C20.3261 28 21.5979 27.4732 22.5355 26.5355C23.4732 25.5979 24 24.3261 24 23V8C24 6.67392 23.4732 5.40215 22.5355 4.46447C21.5979 3.52678 20.3261 3 19 3Z" fill="black"/>
                <path d="M8.5 14L11.5 17L16.5 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {!collapsed && (
              <div className="text-xl font-bold text-[#36406A]">Soar Task</div>
            )}
            {/* Desktop collapse toggle button */}
            <button 
              className="ml-auto text-gray-500 hover:text-gray-700 hidden md:block"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Toggle sidebar"
            >
              {collapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              )}
            </button>
            {/* Mobile close button */}
            <button 
              className="ml-auto text-gray-500 hover:text-gray-700 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className={`${mobileMenuOpen ? 'mt-4' : 'mt-6'}`}>
          <ul className={`${mobileMenuOpen ? 'space-y-6' : 'space-y-1'} relative`}>
            {/* Positioning the active indicator absolutely - hide in mobile menu */}
            {!mobileMenuOpen && (
              <div className="absolute left-0 h-10 w-1 bg-[#36406A] transition-transform duration-300 ease-in-out rounded-r-md pointer-events-none" 
                  style={{
                    transform: `translateY(${menuItems.findIndex(item => 
                      location.pathname === item.path || 
                      (item.path === '/' && location.pathname === '') || 
                      (item.name === 'Setting' && location.pathname.includes('/setting'))
                    ) * 40}px)`
                  }}
              />
            )}
            
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path === '/' && location.pathname === '') || 
                              (item.name === 'Setting' && location.pathname.includes('/setting'));
              return (
                <li key={item.name} className={`${mobileMenuOpen ? 'py-2' : 'h-10'} flex items-center`}>
                  <Link
                    to={item.path}
                    className={`flex items-center h-full w-full ${mobileMenuOpen ? 'justify-center px-0' : 'px-5'} transition-colors ${
                      isActive
                        ? 'text-[#36406A] font-medium'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    <span className={`sidebar-icon flex-shrink-0 ${mobileMenuOpen ? '' : collapsed ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-[#36406A]' : 'text-gray-400'}`}>
                      {item.icon}
                    </span>
                    {(!collapsed || (mobileMenuOpen && false)) && !mobileMenuOpen && <span className="whitespace-nowrap">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
