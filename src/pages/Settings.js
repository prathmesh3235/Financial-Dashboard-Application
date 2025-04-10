import React, { useState } from 'react';
import accountDp from '../assets/images/profiles/account_dp.png';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Edit Profile');
  
  return (
    <div className="bg-white min-h-screen rounded-xl">
      
      <div className="max-w-6xl mx-auto bg-white md:shadow-sm md:rounded-lg md:p-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex">
            <button 
              className={`py-3 px-4 md:px-6 font-medium border-b-2 ${activeTab === 'Edit Profile' ? 'border-black text-[#232323]' : 'border-transparent text-[#718EBF]'}`}
              onClick={() => setActiveTab('Edit Profile')}
            >
              Edit Profile
            </button>
            <button 
              className={`py-3 px-4 md:px-6 font-medium border-b-2 ${activeTab === 'Preferences' ? 'border-black text-[#232323]' : 'border-transparent text-[#718EBF]'}`}
              onClick={() => setActiveTab('Preferences')}
            >
              {window.innerWidth < 768 ? 'Preference' : 'Preferences'}
            </button>
            <button 
              className={`py-3 px-4 md:px-6 font-medium border-b-2 ${activeTab === 'Security' ? 'border-black text-[#232323]' : 'border-transparent text-[#718EBF]'}`}
              onClick={() => setActiveTab('Security')}
            >
              Security
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="mx-auto px-4 md:px-0">
          {activeTab === 'Edit Profile' && (
            <div>
              {/* Profile Section - Different layout for mobile and desktop */}
              <div className="flex flex-col md:flex-row md:items-start">
                {/* Profile Picture - Centered on mobile */}
                <div className="flex justify-center md:justify-start md:mr-8 mb-6">
                  <div className="relative">
                    <img 
                      src={accountDp} 
                      alt="Profile" 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#232323] p-1 rounded-full">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2.5L11.5 4M11.5 4L9.5 6L11.5 4ZM11.5 4L13.5 6L11.5 4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5 8L9.5 6L7.5 8ZM9.5 6L11.5 8L9.5 6Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 14L4.09463 13.6609C4.46166 13.606 4.79481 13.4307 5.06168 13.1639L13 5.22549C13.3905 4.83496 13.3905 4.20179 13 3.81127L12.1887 3C11.7982 2.60948 11.165 2.60948 10.7745 3L2.83624 10.9383C2.56945 11.2052 2.39422 11.5383 2.33926 11.9054L2 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Form - Stacked on mobile, side-by-side on desktop */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Form Fields */}
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Your Name</label>
                          <input
                            type="text"
                            defaultValue="Charlene Reed"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">User Name</label>
                          <input
                            type="text"
                            defaultValue="Charlene Reed"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            defaultValue="charlenereed@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Password</label>
                          <input
                            type="password"
                            defaultValue="**********"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Date of Birth</label>
                          <div className="relative">
                            <input
                              type="text"
                              defaultValue="25 January 1990"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF] pr-10"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6L8 10L12 6" stroke="#718EBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:hidden">
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Present Address</label>
                            <input
                              type="text"
                              defaultValue="San Jose, California, USA"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Permanent Address</label>
                            <input
                              type="text"
                              defaultValue="San Jose, California, USA"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">City</label>
                            <input
                              type="text"
                              defaultValue="San Jose"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Postal Code</label>
                            <input
                              type="text"
                              defaultValue="45962"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Country</label>
                            <input
                              type="text"
                              defaultValue="USA"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Hidden on Mobile */}
                      <div className="hidden md:block">
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Present Address</label>
                          <input
                            type="text"
                            defaultValue="San Jose, California, USA"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Permanent Address</label>
                          <input
                            type="text"
                            defaultValue="San Jose, California, USA"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">City</label>
                          <input
                            type="text"
                            defaultValue="San Jose"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Postal Code</label>
                          <input
                            type="text"
                            defaultValue="45962"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Country</label>
                          <input
                            type="text"
                            defaultValue="USA"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#718EBF]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="mt-6">
                    <button className="w-full md:w-auto md:float-right px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;