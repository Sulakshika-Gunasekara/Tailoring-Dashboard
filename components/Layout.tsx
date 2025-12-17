import React from 'react';
import { LayoutDashboard, Inbox, Scissors, Calendar, Users, BrainCircuit, LogOut, Search, Bell } from 'lucide-react';

interface LayoutProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userRole: 'admin' | 'client';
  onSwitchRole: (role: 'admin' | 'client') => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setCurrentView, userRole, onSwitchRole, children }) => {
  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'Inquiries', icon: Inbox },
    { id: 'jobs', label: 'Job Board', icon: Scissors },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'crm', label: 'Clients', icon: Users },
    { id: 'insights', label: 'Intelligence', icon: BrainCircuit },
  ];

  const clientNavItems = [
      { id: 'client_orders', label: 'My Orders', icon: Scissors },
      { id: 'client_profile', label: 'Profile', icon: Users },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : clientNavItems;

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      {/* macOS Sidebar */}
      <aside className="w-[260px] bg-[#F5F5F7] border-r border-gray-200 flex flex-col pt-6 pb-4 select-none">
        <div className="px-5 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-serif text-lg font-bold shadow-sm">
            S
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900 tracking-tight">StitchCraft</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Tailoring OS</p>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <div className="px-3 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{userRole === 'admin' ? 'Admin Panel' : 'Client Portal'}</p>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#E5E5EA] text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={`${isActive ? 'text-black' : 'text-gray-500 group-hover:text-gray-900'}`} />
                <span className={`text-sm ${isActive ? 'font-medium' : 'font-normal'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 mx-4 mt-auto space-y-2">
            {/* Demo Role Switcher */}
            <button
                onClick={() => onSwitchRole(userRole === 'admin' ? 'client' : 'admin')}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-xs font-medium py-2 rounded-lg transition-colors"
            >
                Switch to {userRole === 'admin' ? 'Client' : 'Admin'}
            </button>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors text-sm">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {/* Header - Minimalist Toolbar */}
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight capitalize">
              {currentView === 'crm' ? 'Clients' : currentView === 'jobs' ? 'Production' : currentView.replace('_', ' ')}
            </h2>
            
            <div className="flex items-center space-x-6">
                <div className="relative group">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-9 pr-4 py-1.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white w-64 transition-all"
                  />
                </div>
                
                <button className="relative text-gray-500 hover:text-black transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                   <div className="text-right hidden sm:block">
                      <p className="text-xs font-semibold text-gray-900">
                        {userRole === 'admin' ? 'Master Tailor' : 'James Sterling'}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {userRole === 'admin' ? 'Admin' : 'Client'}
                      </p>
                   </div>
                   <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold border border-gray-300">
                      {userRole === 'admin' ? 'MT' : 'JS'}
                   </div>
                </div>
            </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 bg-white relative">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};