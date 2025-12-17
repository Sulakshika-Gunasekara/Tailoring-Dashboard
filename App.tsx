import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { InquiryList } from './components/InquiryList';
import { JobBoard } from './components/JobBoard';
import { CalendarView } from './components/CalendarView';
import { ClientCRM } from './components/ClientCRM';
import { generateBusinessInsights } from './services/geminiService';
import { MOCK_ORDERS, MOCK_INQUIRIES } from './constants';
import { BrainCircuit, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inquiries':
        return <InquiryList />;
      case 'jobs':
        return <JobBoard />;
      case 'calendar':
        return <CalendarView />;
      case 'crm':
        return <ClientCRM />;
      case 'insights':
        return <AIInsightsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

const AIInsightsView: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    const result = await generateBusinessInsights(MOCK_ORDERS, MOCK_INQUIRIES);
    setInsight(result);
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-black rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center items-center text-center">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-500 rounded-full blur-[128px] opacity-10 animate-pulse"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                    <BrainCircuit className="text-white" size={32} />
                </div>
                
                <h2 className="text-4xl font-bold tracking-tight mb-4">Executive Intelligence</h2>
                <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
                    Harness the power of Gemini to analyze production flows, predict fabric needs, and optimize revenue strategies.
                </p>

                {!insight && !loading && (
                    <button 
                        onClick={generateReport}
                        className="group bg-white text-black font-semibold py-4 px-10 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2"
                    >
                        <Sparkles size={18} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                        <span>Generate Report</span>
                    </button>
                )}

                {loading && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <p className="text-gray-400 tracking-widest text-xs uppercase animate-pulse">Processing Data...</p>
                    </div>
                )}

                {insight && (
                    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-left animate-fadeIn">
                        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                             <Sparkles size={16} className="text-amber-500" />
                             <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Analysis Complete</span>
                        </div>
                        <div className="prose prose-invert prose-lg">
                             <p className="text-gray-200 leading-relaxed font-light">
                                {insight}
                            </p>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={() => setInsight("")}
                                className="text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                Generate New Analysis
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default App;