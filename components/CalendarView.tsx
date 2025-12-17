import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react';
import { MOCK_APPOINTMENTS } from '../constants';
import { Appointment } from '../types';

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); // Oct 2023
  const [selectedDay, setSelectedDay] = useState<number>(27); // Oct 27

  // Calendar generation logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 is Sunday
  
  // Adjust for Monday start if needed, but let's stick to Sunday start for standard view
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getAppointmentsForDay = (day: number) => {
    return MOCK_APPOINTMENTS.filter(app => {
        const d = new Date(app.date);
        return d.getDate() === day && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
    });
  }

  const selectedAppointments = getAppointmentsForDay(selectedDay);

  return (
    <div className="h-full flex gap-8">
      {/* Calendar Grid Section */}
      <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">{day}</div>
            ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
            {days.map((day, idx) => (
                <div 
                    key={idx} 
                    onClick={() => day && setSelectedDay(day)}
                    className={`
                        relative border rounded-xl p-2 min-h-[80px] cursor-pointer transition-all
                        ${!day ? 'border-transparent cursor-default' : ''}
                        ${day === selectedDay ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500' : 'border-gray-100 hover:border-gray-300 bg-white'}
                    `}
                >
                    {day && (
                        <>
                            <span className={`text-sm font-semibold ${day === selectedDay ? 'text-blue-600' : 'text-gray-700'}`}>{day}</span>
                            <div className="mt-2 space-y-1">
                                {getAppointmentsForDay(day).map(apt => (
                                    <div key={apt.id} className={`text-[10px] truncate px-1.5 py-0.5 rounded-sm ${
                                        apt.type === 'Fit-On' ? 'bg-purple-100 text-purple-700' :
                                        apt.type === 'Measurement' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {apt.clientName}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-80 flex flex-col">
        <div className="bg-[#1C1C1E] text-white p-6 rounded-3xl shadow-xl flex-1 relative overflow-hidden">
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

             <div className="flex justify-between items-center mb-6 relative z-10">
                 <div>
                    <h3 className="text-3xl font-bold">{selectedDay}</h3>
                    <p className="text-white/60 uppercase tracking-wider text-xs font-medium">
                        {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay).toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                 </div>
                 <button className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-blue-900/50">
                     <Plus size={20} />
                 </button>
             </div>

             <div className="space-y-4 relative z-10">
                 {selectedAppointments.length > 0 ? selectedAppointments.map(apt => (
                     <div key={apt.id} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:bg-white/15 transition-colors group cursor-pointer">
                         <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                 apt.type === 'Fit-On' ? 'bg-purple-500/20 text-purple-200' : 'bg-blue-500/20 text-blue-200'
                             }`}>{apt.type}</span>
                             <span className="text-xs text-white/40">{apt.durationMin}m</span>
                         </div>
                         <h4 className="font-semibold text-lg">{apt.clientName}</h4>
                         <div className="flex items-center gap-2 mt-2 text-white/50 text-xs">
                             <Clock size={12} />
                             <span>{new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                         </div>
                     </div>
                 )) : (
                     <div className="text-center py-10 text-white/30">
                         <p>No appointments</p>
                     </div>
                 )}
             </div>
        </div>
      </div>
    </div>
  );
};