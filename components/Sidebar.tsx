import React, { useState } from 'react';
import { USERS } from '../constants';
import { User } from '../types';
import { ViewMode } from '../App';

interface SidebarProps {
  onSelectUser: (user: User) => void;
  onSelectDashboard: () => void;
  selectedUser: User | null;
  currentView: ViewMode;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectUser, 
  onSelectDashboard, 
  selectedUser, 
  currentView 
}) => {
  const [isProfilesOpen, setIsProfilesOpen] = useState(true);

  const toggleProfiles = () => setIsProfilesOpen(!isProfilesOpen);

  return (
    <div className="w-full md:w-72 bg-slate-800 flex-shrink-0 flex flex-col pt-4 relative shadow-xl z-20 overflow-y-auto">
      
      {/* Dashboard Button */}
      <div className="px-4 mb-2">
        <button
          onClick={onSelectDashboard}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
            currentView === 'dashboard' 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          <span className="font-medium">Dashboard</span>
        </button>
      </div>

      {/* Static Menu Items 1-4 (Non-collapsible) */}
      <div className="px-4 mb-4 border-b border-slate-700/50 pb-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-2">
          Shortcuts
        </div>
        {['1', '2', '3', '4'].map((item) => (
          <button
            key={item}
            className="w-full flex items-center px-4 py-2.5 text-slate-400 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-slate-600 mr-3"></span>
            <span className="font-medium">{item}</span>
          </button>
        ))}
      </div>

      {/* Team Profiles Accordion */}
      <div className="px-4">
        <button
          onClick={toggleProfiles}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <span className="font-medium">Team Profiles</span>
          </div>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isProfilesOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {/* User List */}
        <div className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ${isProfilesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={`w-full flex flex-col items-start px-4 py-2 pl-12 rounded-lg transition-colors text-left ${
                currentView === 'profile' && selectedUser?.id === user.id 
                  ? 'bg-slate-700/50 text-blue-400' 
                  : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'
              }`}
            >
              <span className="text-sm font-medium truncate w-full">{user.name}</span>
              <span className="text-xs opacity-70 truncate w-full">{user.role}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};