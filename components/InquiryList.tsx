import React, { useState } from 'react';
import { MOCK_INQUIRIES, MOCK_CLIENTS } from '../constants';
import { Inquiry, InterestLevel } from '../types';
import { analyzeInquiryPsychology } from '../services/geminiService';
import { MessageSquare, Phone, User, Sparkles, Inbox, Check, X, ArrowRight } from 'lucide-react';

export const InquiryList: React.FC = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const handleSelectInquiry = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setAiAnalysis(null);
    setLoadingAnalysis(true);

    const existingClient = MOCK_CLIENTS.find(c => c.id === inquiry.clientId);
    
    try {
        const resultJson = await analyzeInquiryPsychology(inquiry, existingClient);
        const result = JSON.parse(resultJson);
        setAiAnalysis(result);
    } catch (e) {
        console.error("Failed to parse AI response", e);
    } finally {
        setLoadingAnalysis(false);
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* List Column */}
      <div className="w-[350px] bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 backdrop-blur-sm">
          <h3 className="font-bold text-gray-900 tracking-tight">Inbox</h3>
          <p className="text-xs text-gray-500 mt-0.5">{MOCK_INQUIRIES.length} unread messages</p>
        </div>
        <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
          {MOCK_INQUIRIES.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => handleSelectInquiry(inquiry)}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedInquiry?.id === inquiry.id 
                    ? 'bg-blue-50/50 border-l-4 border-l-blue-500 pl-3' 
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-semibold text-sm ${selectedInquiry?.id === inquiry.id ? 'text-blue-900' : 'text-gray-900'}`}>
                    {inquiry.clientName}
                </h4>
                <span className="text-[10px] text-gray-400">
                    {new Date(inquiry.receivedDate).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{inquiry.message}</p>
              
              <div className="flex items-center gap-2">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  inquiry.interestLevel === InterestLevel.HOT ? 'bg-red-100 text-red-700' : 
                  inquiry.interestLevel === InterestLevel.WARM ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {inquiry.interestLevel}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    {inquiry.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Column */}
      <div className="flex-1 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
        {selectedInquiry ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 bg-white flex justify-between items-start">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                    {selectedInquiry.clientName.substring(0,1)}
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">{selectedInquiry.clientName}</h2>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"><Phone size={12} /> +1 555-0199</span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"><User size={12} /> New Customer</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} onClick={() => setSelectedInquiry(null)} />
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                {/* Message Bubble */}
                <div className="mb-10 max-w-2xl">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Client Message</h3>
                    <div className="bg-[#F5F5F7] p-6 rounded-2xl rounded-tl-sm text-gray-700 leading-relaxed border border-gray-100 shadow-sm text-sm">
                        "{selectedInquiry.message}"
                    </div>
                    <div className="flex justify-start mt-2 ml-1">
                         <span className="text-[10px] text-gray-400">Received via {selectedInquiry.source} • {new Date(selectedInquiry.receivedDate).toLocaleString()}</span>
                    </div>
                </div>

                {/* AI Psychological Snapshot */}
                <div className="bg-black text-white rounded-2xl p-6 relative overflow-hidden shadow-xl mb-8">
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-[80px] opacity-30"></div>
                     <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-30"></div>
                    
                    <h3 className="flex items-center gap-2 text-white/90 font-bold uppercase tracking-widest text-xs mb-6 relative z-10">
                        <Sparkles size={14} className="text-purple-400" /> AI Analysis
                    </h3>
                    
                    {loadingAnalysis ? (
                        <div className="flex flex-col items-center justify-center py-12 text-white/50 gap-3">
                            <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></div>
                            <span className="text-xs tracking-wide">Processing behavioral signals...</span>
                        </div>
                    ) : aiAnalysis ? (
                        <div className="grid grid-cols-3 gap-6 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[10px] text-white/40 uppercase tracking-wider">Decision Style</p>
                                <p className="text-lg font-medium tracking-tight">{aiAnalysis.decision_style}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-white/40 uppercase tracking-wider">Budget</p>
                                <p className="text-lg font-medium tracking-tight">{aiAnalysis.budget_sensitivity}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-white/40 uppercase tracking-wider">Style</p>
                                <p className="text-lg font-medium tracking-tight">{aiAnalysis.style_preference}</p>
                            </div>
                            <div className="col-span-3 mt-4 pt-4 border-t border-white/10">
                                <p className="text-[10px] text-purple-300 uppercase font-bold mb-2 tracking-wider">Recommended Strategy</p>
                                <p className="text-sm text-white/80 leading-relaxed font-light">"{aiAnalysis.suggested_approach}"</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-white/40 text-sm">Analysis unavailable.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 border-t border-gray-100 pt-8">
                    <button className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-gray-200 active:scale-95 flex items-center justify-center gap-2">
                        <span>Convert to Appointment</span>
                        <ArrowRight size={16} />
                    </button>
                    <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                        <MessageSquare size={16} />
                        <span>Reply</span>
                    </button>
                     <button className="px-4 border border-gray-200 hover:bg-red-50 hover:border-red-100 hover:text-red-600 text-gray-400 rounded-xl transition-colors">
                        <X size={18} />
                    </button>
                </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50/30">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Inbox size={32} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500">Select an inquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};
