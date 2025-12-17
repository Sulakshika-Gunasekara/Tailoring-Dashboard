import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AlertCircle, CheckCircle, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { MOCK_INQUIRIES, MOCK_APPOINTMENTS } from '../constants';
import { OrderStatus } from '../types';

interface DashboardProps {
    orders: Order[];
}

export const Dashboard: React.FC<DashboardProps> = ({ orders }) => {
  const activeOrders = orders.filter(o => o.status !== OrderStatus.DELIVERED && o.status !== OrderStatus.READY).length;
  const pendingInquiries = MOCK_INQUIRIES.filter(i => i.status === 'New').length;
  const todayAppointments = MOCK_APPOINTMENTS.filter(a => new Date(a.date).getDate() === 27).length; // Mock logic for demo
  const readyOrders = orders.filter(o => o.status === OrderStatus.READY).length;

  const revenueData = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 900 },
    { name: 'Wed', revenue: 2400 },
    { name: 'Thu', revenue: 1500 },
    { name: 'Fri', revenue: 3200 },
    { name: 'Sat', revenue: 4500 },
    { name: 'Sun', revenue: 1800 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Section */}
      <div className="flex justify-between items-end mb-4">
        <div>
           <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h2>
           <p className="text-gray-500 mt-1">Here's what's happening in your shop today.</p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Orders" 
          value={activeOrders} 
          icon={<Clock className="text-blue-500" size={24} />} 
          subtitle="Production"
          color="bg-blue-500"
        />
        <StatCard 
          title="New Inquiries" 
          value={pendingInquiries} 
          icon={<AlertCircle className="text-orange-500" size={24} />} 
          subtitle="Sales"
          color="bg-orange-500"
        />
        <StatCard 
          title="Appointments" 
          value={todayAppointments} 
          icon={<CalendarIcon className="text-purple-500" />} 
          subtitle="Today"
          color="bg-purple-500"
        />
        <StatCard 
          title="Ready to Deliver" 
          value={readyOrders} 
          icon={<CheckCircle className="text-green-500" size={24} />} 
          subtitle="Logistics"
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 apple-card p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue</h3>
              <p className="text-sm text-gray-500">Weekly performance</p>
            </div>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
              <TrendingUp size={16} />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#8E8E93', fontSize: 12}} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                    tick={{fill: '#8E8E93', fontSize: 12}}
                />
                <Tooltip 
                  cursor={{fill: '#F2F2F7', radius: 4}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                  itemStyle={{ color: '#111827', fontWeight: 600 }}
                />
                <Bar dataKey="revenue" fill="#111827" radius={[6, 6, 6, 6]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attention Required */}
        <div className="apple-card p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Action Items</h3>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {orders.filter(o => o.status === OrderStatus.FIRST_FIT).map(order => (
              <div key={order.id} className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{order.clientName}</p>
                        <p className="text-xs text-gray-500">Fit-On Due: {new Date(order.dueDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            ))}
             <div className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500"></div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Fabric Stock Low</p>
                        <p className="text-xs text-gray-500">Italian Wool 120s Navy</p>
                    </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
          </div>
          <button className="mt-6 w-full py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, subtitle, color }: any) => (
  <div className="apple-card p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
    <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl bg-opacity-10 ${color.replace('bg-', 'bg-').replace('500', '50')}`}>
            {icon}
        </div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{subtitle}</span>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
      <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
    </div>
  </div>
);

// Custom icon wrapper
const CalendarIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
)
