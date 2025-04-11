import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DashboardIcon, 
  TransactionsIcon, 
  AccountsIcon, 
  InvestmentsIcon, 
  CreditCardsIcon, 
  LoansIcon, 
  ServicesIcon, 
  PrivilegesIcon, 
  SettingsIcon,
  SoarTaskIcon
} from '../../assets/icons/SidebarIcons';

// Add CSS to eliminate all borders
const sidebarStyles = {
  noBorders: {
    border: 'none',
    borderStyle: 'none',
    outline: 'none'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    border: 'none'
  },
  listItem: {
    border: 'none',
    borderStyle: 'none'
  }
};

const Sidebar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if mobile screen on initial load and when window resizes
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

  // Menu items with icons
  const menuItems = [
    {
      name: 'Home',
      icon: <DashboardIcon />,
      path: '/',
    },
    {
      name: 'Transactions',
      icon: <TransactionsIcon />,
      path: '/transactions',
    },
    {
      name: 'Accounts',
      icon: <AccountsIcon />,
      path: '/accounts',
    },
    {
      name: 'Investments',
      icon: <InvestmentsIcon />,
      path: '/investments',
    },
    {
      name: 'Credit Cards',
      icon: <CreditCardsIcon />,
      path: '/credit-cards',
    },
    {
      name: 'Loans',
      icon: <LoansIcon />,
      path: '/loans',
    },
    {
      name: 'Services',
      icon: <ServicesIcon />,
      path: '/services',
    },
    {
      name: 'Privileges',
      icon: <PrivilegesIcon />,
      path: '/privileges',
    },
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
    },
  ];

  // Cross/Close icon component
  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  // Hamburger menu icon component
  const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  // Render menu items
  const renderMenuItems = () => {
    return menuItems.map((item) => {
      const isActive = location.pathname === item.path || 
                      (item.path === '/' && (location.pathname === '' || location.pathname === '/')) || 
                      (item.path === '/settings' && location.pathname.includes('/settings'));
      
      return (
        <li key={item.name} className="h-12 flex items-center" style={sidebarStyles.listItem} role="none">
          <Link
            to={item.path}
            className={`flex items-center h-full w-full px-6 transition-colors ${
              isActive
                ? 'text-[#36406A] font-medium'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setMobileMenuOpen(false)}
            style={sidebarStyles.noBorders}
            role="menuitem"
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={`sidebar-icon flex-shrink-0 mr-4 ${isActive ? 'text-[#36406A]' : 'text-gray-400'}`} aria-hidden="true">
              {item.icon}
            </span>
            <span className="whitespace-nowrap">{item.name}</span>
          </Link>
        </li>
      );
    });
  };

  // Active indicator position
  const getIndicatorPosition = () => {
    const activeIndex = menuItems.findIndex(item => 
      location.pathname === item.path || 
      (item.path === '/' && (location.pathname === '' || location.pathname === '/')) ||
      (item.path === '/settings' && location.pathname.includes('/settings'))
    );
    return `translateY(${activeIndex * 48}px)`;
  };

  return (
    <>
      {/* Desktop sidebar */}
      {!isMobile && (
        <div 
          className="hidden md:block bg-white h-screen shadow-md w-64 fixed" 
          style={sidebarStyles.noBorders}
          role="navigation"
          aria-label="Main sidebar"
        >
          {/* Header - aligned with navbar */}
          <div 
            className="py-5 px-5 flex items-center h-16" 
            style={{borderBottom: '1px solid #f3f4f6', ...sidebarStyles.noBorders}}
            role="banner"
          >
            <div className="w-6 h-7 mr-3 flex-shrink-0">
              <SoarTaskIcon aria-hidden="true" />
            </div>
            <div className="text-xl font-bold text-[#36406A]">Soar Task</div>
          </div>

          {/* Navigation */}
          <nav className="mt-8" aria-label="Sidebar navigation">
            <ul className="space-y-0 relative" style={sidebarStyles.list} role="menu">
              {/* Active indicator */}
              <div 
                className="absolute left-0 h-10 w-1 bg-[#36406A] transition-transform duration-300 ease-in-out rounded-r-md pointer-events-none" 
                style={{
                  transform: getIndicatorPosition(),
                  ...sidebarStyles.noBorders
                }}
                aria-hidden="true"
              />
              
              {renderMenuItems()}
            </ul>
          </nav>
        </div>
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <>
          {/* Mobile sidebar toggle button */}
          {!mobileMenuOpen && (
            <button 
              className="fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
              style={sidebarStyles.noBorders}
              aria-label="Open mobile menu"
              aria-expanded="false"
            >
              <HamburgerIcon aria-hidden="true" />
            </button>
          )}

          {/* Mobile sidebar panel */}
          <div 
            className={`fixed inset-0 z-20 transition-transform duration-300 ease-in-out transform ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={sidebarStyles.noBorders}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="h-full w-64 bg-white shadow-md flex flex-col" style={sidebarStyles.noBorders}>
              {/* Header */}
              <div className="py-5 px-5 flex items-center justify-center relative h-16" style={{borderBottom: '1px solid #f3f4f6', ...sidebarStyles.noBorders}}>
                {/* Close button (X) positioned absolutely to the left */}
                <button 
                  className="absolute left-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                  style={sidebarStyles.noBorders}
                  aria-label="Close mobile menu"
                >
                  <CloseIcon aria-hidden="true" />
                </button>
                
                {/* Logo and text centered in the header */}
                <div className="flex items-center">
                  <div className="w-6 h-7 mr-3 flex-shrink-0">
                    <SoarTaskIcon aria-hidden="true" />
                  </div>
                  <div className="text-xl font-bold text-[#36406A]">Soar Task</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-8 flex-1 overflow-y-auto" aria-label="Mobile sidebar navigation">
                <ul className="space-y-0 relative" style={sidebarStyles.list} role="menu">
                  {/* Active indicator */}
                  <div 
                    className="absolute left-0 h-10 w-1 bg-[#36406A] transition-transform duration-300 ease-in-out rounded-r-md pointer-events-none" 
                    style={{
                      transform: getIndicatorPosition(),
                      ...sidebarStyles.noBorders
                    }}
                    aria-hidden="true"
                  />
                  
                  {renderMenuItems()}
                </ul>
              </nav>
            </div>
            
            {/* Close sidebar when clicking outside */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={() => setMobileMenuOpen(false)}
              style={sidebarStyles.noBorders}
              aria-hidden="true"
            ></div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;