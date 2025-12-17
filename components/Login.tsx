import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'admin' | 'client') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'admin' | 'client'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Mock Authentication Logic
    // In a real app, this would validate against a backend
    if (role === 'admin' && email === 'admin@stitchcraft.com' && password === 'admin') {
        onLogin('admin');
    } else if (role === 'client' && email === 'james@sterling.co' && password === 'client') {
        onLogin('client');
    } else {
        // Fallback demo credentials check
        // Allow any valid email format for demo if password is provided
        if (password.length > 0) {
            onLogin(role);
        } else {
             setError('Invalid credentials.');
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">

        {/* Left Side - Brand / Art */}
        <div className="w-full md:w-1/2 bg-black text-white p-12 flex flex-col justify-between relative overflow-hidden">
             {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500 rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/10">
                    <span className="font-serif font-bold text-2xl">S</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">StitchCraft</h1>
                <p className="text-gray-400 font-light">The Bespoke Tailoring OS</p>
            </div>

            <div className="relative z-10">
                <blockquote className="text-lg font-serif italic text-gray-300 mb-4">
                    "Style is a way to say who you are without having to speak."
                </blockquote>
                <p className="text-sm text-gray-500 uppercase tracking-widest">— Rachel Zoe</p>
            </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">Please sign in to your account.</p>

            <div className="bg-gray-100 p-1 rounded-lg flex mb-8">
                <button
                    onClick={() => setRole('admin')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'admin' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    Admin
                </button>
                <button
                    onClick={() => setRole('client')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'client' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    Client
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={role === 'admin' ? 'admin@stitchcraft.com' : 'james@sterling.co'}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <span>Sign In</span>
                    <Sparkles size={16} className="text-gray-400" />
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-xs text-gray-400">
                    Demo Credentials: <br/>
                    Admin: admin@stitchcraft.com / admin <br/>
                    Client: james@sterling.co / client
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};
