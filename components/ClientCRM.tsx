import React, { useState } from 'react';
import { MOCK_CLIENTS } from '../constants';
import { Client, Order } from '../types';
import { Phone, Mail, Search, Ruler, History, ArrowUpRight, Calendar } from 'lucide-react';

interface ClientCRMProps {
    orders: Order[];
}

export const ClientCRM: React.FC<ClientCRMProps> = ({ orders }) => {
  const [selectedClient, setSelectedClient] = useState<Client>(MOCK_CLIENTS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = MOCK_CLIENTS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clientOrders = orders.filter(o => o.clientId === selectedClient.id);
  const appointmentRequests = clientOrders.filter(o => o.changeRequestStatus && o.changeRequestStatus !== 'Resolved');

  return (
    <div className="flex h-full gap-8">
      {/* List Panel */}
      <div className="w-80 bg-white border border-gray-200 rounded-3xl flex flex-col shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
             <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search clients..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                  />
             </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {filteredClients.map(client => (
                <div 
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${selectedClient.id === client.id ? 'bg-[#F5F5F7]' : 'hover:bg-gray-50'}`}
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black text-white flex items-center justify-center font-bold text-sm shadow-md">
                        {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h4 className={`text-sm font-semibold ${selectedClient.id === client.id ? 'text-black' : 'text-gray-700'}`}>{client.name}</h4>
                        <p className="text-xs text-gray-500 truncate w-40">{client.email}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 overflow-y-auto pr-2">
         {/* Profile Header */}
         <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-6 flex justify-between items-start">
            <div className="flex gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl font-serif text-gray-400">
                    {selectedClient.name[0]}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{selectedClient.name}</h1>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Phone size={14} /> {selectedClient.phone}</span>
                        <span className="flex items-center gap-1.5"><Mail size={14} /> {selectedClient.email}</span>
                    </div>
                    <div className="flex gap-2 mt-6">
                         <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                             LTV: ${selectedClient.ltv}
                         </span>
                         <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100">
                             {selectedClient.totalOrders} Orders
                         </span>
                         <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100 capitalize">
                             {selectedClient.fitPreference} Fit
                         </span>
                    </div>
                </div>
            </div>
         </div>

         {/* Appointment/Change Requests Alert */}
         {appointmentRequests.length > 0 && (
             <div className="mb-6">
                 {appointmentRequests.map(req => (
                     <div key={req.id} className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-900">Appointment Request: {req.garmentType}</h4>
                                <p className="text-xs text-amber-700">{req.changeRequestStatus} - "{req.changeRequest}"</p>
                                {req.appointmentSelectedSlot && (
                                     <p className="text-xs font-semibold text-amber-800 mt-1">
                                         Client selected: {new Date(req.appointmentSelectedSlot).toLocaleString()}
                                     </p>
                                )}
                            </div>
                        </div>
                        <button className="bg-white text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100">
                            Manage
                        </button>
                     </div>
                 ))}
             </div>
         )}

         <div className="grid grid-cols-2 gap-6">
            {/* Measurements Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Ruler size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900">Measurements</h3>
                </div>
                
                {selectedClient.measurements && Object.keys(selectedClient.measurements).length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedClient.measurements).map(([key, value]) => (
                            <div key={key} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{key}</p>
                                <p className="text-lg font-bold text-gray-900">{value}"</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400 text-sm">No measurements on file</div>
                )}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 italic">" {selectedClient.notes} "</p>
                </div>
            </div>

            {/* History Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                     <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <History size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900">Order History</h3>
                </div>
                
                <div className="space-y-3">
                    {clientOrders.length > 0 ? clientOrders.map(order => (
                        <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                             <div>
                                 <p className="font-semibold text-gray-900 text-sm">{order.garmentType}</p>
                                 <p className="text-xs text-gray-500">{new Date(order.dueDate).getFullYear()} • {order.status}</p>
                             </div>
                             <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-400 text-sm">No past orders</div>
                    )}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};