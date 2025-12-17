import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { MoreHorizontal, Scissors, Sparkles, ChevronRight } from 'lucide-react';
import { suggestJobAdjustments } from '../services/geminiService';

interface JobBoardProps {
    orders: Order[];
    onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
}

export const JobBoard: React.FC<JobBoardProps> = ({ orders, onUpdateOrder }) => {
  const [aiSuggestion, setAiSuggestion] = useState<{id: string, text: string} | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const stages = [
    { id: OrderStatus.NEW, label: 'New' },
    { id: OrderStatus.CUTTING, label: 'Cutting' },
    { id: OrderStatus.STITCHING, label: 'Stitching' },
    { id: OrderStatus.FIRST_FIT, label: 'Fit-On' },
    { id: OrderStatus.READY, label: 'Ready' },
  ];

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    onUpdateOrder(orderId, { status: newStatus });
  };

  const handleAiConsult = async (order: Order) => {
    setLoadingAi(true);
    setAiSuggestion(null);
    const suggestion = await suggestJobAdjustments(order);
    setAiSuggestion({ id: order.id, text: suggestion });
    setLoadingAi(false);
  };

  return (
    <div className="h-full overflow-x-auto pb-4">
      <div className="flex space-x-6 min-w-max h-full">
        {stages.map((stage) => {
          const stageOrders = orders.filter(o => o.status === stage.id);
          return (
            <div key={stage.id} className="w-[320px] flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-semibold text-gray-900 tracking-tight">{stage.label}</h3>
                <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-medium">
                  {stageOrders.length}
                </span>
              </div>
              <div className="bg-[#F5F5F7] rounded-2xl p-3 flex-1 overflow-y-auto space-y-3 border border-gray-100">
                {stageOrders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200/50 group hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{order.garmentType}</span>
                      <button className="text-gray-300 hover:text-gray-600 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{order.clientName}</h4>
                    <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                        <ClockIcon />
                        Due {new Date(order.dueDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex -space-x-2">
                             <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gray-700 to-black border-2 border-white flex items-center justify-center text-[10px] text-white font-bold" title={order.tailorAssigned}>
                                 {order.tailorAssigned?.substring(0,1) || '?'}
                             </div>
                        </div>
                        
                        <div className="flex gap-2">
                             <button 
                                onClick={() => handleAiConsult(order)}
                                className={`p-1.5 rounded-lg transition-colors ${loadingAi && aiSuggestion?.id === order.id ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'}`}
                                title="AI Insights"
                             >
                                <Sparkles size={16} />
                             </button>
                             
                             {stage.id !== OrderStatus.READY && (
                                <button 
                                    onClick={() => {
                                        const nextStageIndex = stages.findIndex(s => s.id === stage.id) + 1;
                                        if (nextStageIndex < stages.length) {
                                            handleStatusChange(order.id, stages[nextStageIndex].id);
                                        }
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                             )}
                        </div>
                    </div>

                    {/* AI Suggestion Panel */}
                    {aiSuggestion?.id === order.id && (
                        <div className="mt-4 p-3 bg-purple-50/50 border border-purple-100 rounded-lg text-xs text-purple-900 animate-fadeIn backdrop-blur-sm">
                             <div className="font-semibold mb-1 flex items-center gap-1">
                                <Sparkles size={12} className="text-purple-600" /> 
                                <span className="uppercase tracking-wide text-[10px] text-purple-600">Tailor Intelligence</span>
                             </div>
                             {loadingAi ? (
                                 <span className="text-purple-400">Thinking...</span>
                             ) : (
                                 <div className="prose prose-sm" dangerouslySetInnerHTML={{__html: aiSuggestion.text.replace(/\n/g, '<br/>')}} />
                             )}
                        </div>
                    )}
                  </div>
                ))}
                {stageOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-300">
                    <Scissors size={24} className="mb-2 opacity-20" />
                    <span className="text-xs font-medium">No active jobs</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
)