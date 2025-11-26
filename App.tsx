import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentArea } from './components/ContentArea';
import { ChatPanel } from './components/ChatPanel';
import { User } from './types';

export type ViewMode = 'dashboard' | 'profile';

function App() {
  const [view, setView] = useState<ViewMode>('dashboard');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setView('profile');
  };

  const handleSelectDashboard = () => {
    setView('dashboard');
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden flex-col bg-slate-50">
      {/* Topbar */}
      <header className="h-[70px] bg-slate-900 text-white flex items-center px-6 md:px-8 shadow-md z-30 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 rounded p-1">
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Team Nexus</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* AI Toggle Button */}
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${
              isChatOpen 
                ? 'bg-blue-600 border-blue-500 text-white' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <span className="text-sm font-medium">Ask AI</span>
          </button>

          <div className="hidden md:block text-xs md:text-sm text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
             Admin Dashboard
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          selectedUser={selectedUser} 
          onSelectUser={handleSelectUser}
          onSelectDashboard={handleSelectDashboard}
          currentView={view}
        />
        
        {/* Main Content */}
        <div className="flex-1 relative flex overflow-hidden">
          <ContentArea user={selectedUser} viewMode={view} />
          
          {/* Chat Panel Overlay */}
          <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default App;