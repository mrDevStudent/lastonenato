import React from 'react';
import { User } from '../types';
import { ViewMode } from '../App';

interface ContentAreaProps {
  user: User | null;
  viewMode: ViewMode;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ user, viewMode }) => {
  
  // DASHBOARD VIEW
  if (viewMode === 'dashboard') {
    return (
      <div className="flex-1 p-8 md:p-16 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight mb-8">Dashboard</h1>
          {/* Content left blank as requested */}
          <div className="bg-white p-6 rounded-lg border-2 border-dashed border-slate-200 min-h-[300px] flex items-center justify-center">
            <span className="text-slate-400">Dashboard Content</span>
          </div>
        </div>
      </div>
    );
  }

  // PROFILE VIEW (No user selected state)
  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gray-50 text-slate-400">
        <svg className="w-24 h-24 mb-6 opacity-20" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <h2 className="text-2xl font-light text-slate-600">No Member Selected</h2>
        <p className="mt-2 text-center max-w-md">Please select a team member from the sidebar to view their details.</p>
      </div>
    );
  }

  // PROFILE VIEW (User selected)
  return (
    <div className="flex-1 p-8 md:p-16 bg-white overflow-y-auto">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-3xl font-light">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">{user.name}</h1>
            <div className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {user.role}
            </div>
          </div>
        </div>

        <div className="prose prose-slate lg:prose-lg max-w-none">
          <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Professional Summary</h3>
          
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 min-h-[100px]">
             {user.description ? (
               <p className="text-slate-600 leading-relaxed italic">"{user.description}"</p>
             ) : (
               <span className="text-slate-400 text-sm italic">No summary available.</span>
             )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
               <h4 className="font-medium text-slate-900 mb-2">Contact Info</h4>
               <p className="text-slate-500 text-sm">email: {user.name.split(',')[0].toLowerCase().trim()}@example.com</p>
               <p className="text-slate-500 text-sm">ext: 100{user.id}</p>
             </div>
             <div className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
               <h4 className="font-medium text-slate-900 mb-2">Department</h4>
               <p className="text-slate-500 text-sm">Technology & Operations</p>
               <p className="text-slate-500 text-sm">Building B, Floor 4</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};