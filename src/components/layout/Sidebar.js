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
      name: 'My Privileges',
      icon: <PrivilegesIcon />,
      path: '/privileges',
    },
    {
      name: 'Setting',
      icon: <SettingsIcon />,
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
              <SoarTaskIcon />
            </div>
            {!collapsed && (
              <div className="text-xl font-bold text-[#36406A]">Soar Task</div>
            )}
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
        <nav className={`${mobileMenuOpen ? 'mt-4' : 'mt-8'}`}>
          <ul className={`${mobileMenuOpen ? 'space-y-6' : 'space-y-4'} relative`}>
            {/* Positioning the active indicator absolutely - hide in mobile menu */}
            {!mobileMenuOpen && (
              <div className="absolute left-0 h-10 w-1 bg-[#36406A] transition-transform duration-300 ease-in-out rounded-r-md pointer-events-none" 
                  style={{
                    transform: `translateY(${menuItems.findIndex(item => 
                      location.pathname === item.path || 
                      (item.path === '/' && location.pathname === '') || 
                      (item.name === 'Setting' && location.pathname.includes('/setting'))
                    ) * 48}px)`
                  }}
              />
            )}
            
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path === '/' && location.pathname === '') || 
                              (item.name === 'Setting' && location.pathname.includes('/setting'));
              return (
                <li key={item.name} className={`${mobileMenuOpen ? 'py-2' : 'h-12'} flex items-center`}>
                  <Link
                    to={item.path}
                    className={`flex items-center h-full w-full ${mobileMenuOpen ? 'justify-center px-0' : 'px-6'} transition-colors ${
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
                    <span className={`sidebar-icon flex-shrink-0 ${mobileMenuOpen ? '' : collapsed ? 'mx-auto' : 'mr-4'} ${isActive ? 'text-[#36406A]' : 'text-gray-400'}`}>
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
