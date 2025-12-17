import React, { useState } from 'react';
import { MOCK_CLIENTS, MOCK_CURRENT_USER_ID } from '../constants';
import { Client } from '../types';
import { User, Phone, Mail, Ruler, Edit2, Save, X } from 'lucide-react';

export const ClientProfile: React.FC = () => {
    // Simulate fetching the current user
    const [client, setClient] = useState<Client | undefined>(
        MOCK_CLIENTS.find(c => c.id === MOCK_CURRENT_USER_ID)
    );
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Client>>({});

    if (!client) return <div>User not found</div>;

    const handleEdit = () => {
        setFormData({ ...client });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({});
    };

    const handleSave = () => {
        // In a real app, API call here
        setClient(prev => prev ? { ...prev, ...formData } as Client : undefined);
        setIsEditing(false);
    };

    const handleChange = (field: keyof Client, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Helper for nested measurement updates
    const handleMeasurementChange = (key: string, value: number) => {
        setFormData(prev => ({
            ...prev,
            measurements: {
                ...prev.measurements,
                [key]: value
            }
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* Header Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm flex justify-between items-start">
                <div className="flex gap-6 items-center">
                    <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-serif">
                        {client.name.charAt(0)}
                    </div>
                    <div>
                        {isEditing ? (
                            <input
                                className="text-3xl font-bold text-gray-900 tracking-tight bg-gray-50 border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        ) : (
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{client.name}</h1>
                        )}
                        <p className="text-gray-500">Valued Client since 2023</p>
                    </div>
                </div>

                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                        <Edit2 size={16} />
                        <span>Edit Profile</span>
                    </button>
                ) : (
                    <div className="flex gap-2">
                         <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Save size={16} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                     <div className="flex items-center gap-2 mb-6 text-gray-900">
                        <User size={20} />
                        <h3 className="font-bold">Personal Details</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                            {isEditing ? (
                                <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-2 bg-gray-50">
                                    <Mail size={16} className="text-gray-400" />
                                    <input
                                        className="bg-transparent w-full focus:outline-none text-sm"
                                        value={formData.email || ''}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Mail size={16} className="text-gray-400" />
                                    <span>{client.email}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                            {isEditing ? (
                                <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-2 bg-gray-50">
                                    <Phone size={16} className="text-gray-400" />
                                    <input
                                        className="bg-transparent w-full focus:outline-none text-sm"
                                        value={formData.phone || ''}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Phone size={16} className="text-gray-400" />
                                    <span>{client.phone}</span>
                                </div>
                            )}
                        </div>

                         <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fit Preference</label>
                            {isEditing ? (
                                <select
                                    className="w-full border border-gray-200 rounded-lg p-2 bg-gray-50 text-sm focus:outline-none"
                                    value={formData.fitPreference || 'Regular'}
                                    onChange={(e) => handleChange('fitPreference', e.target.value)}
                                >
                                    <option value="Slim">Slim</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Comfort">Comfort</option>
                                </select>
                            ) : (
                                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                    {client.fitPreference}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Measurements */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 text-gray-900">
                        <Ruler size={20} />
                        <h3 className="font-bold">Measurements (Inches)</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {client.measurements && Object.entries(client.measurements).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{key}</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
                                        value={formData.measurements?.[key] ?? value}
                                        onChange={(e) => handleMeasurementChange(key, parseFloat(e.target.value))}
                                    />
                                ) : (
                                    <span className="text-lg font-bold text-gray-900">{value}"</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {(!client.measurements || Object.keys(client.measurements).length === 0) && (
                        <div className="text-center text-gray-400 text-sm py-4">
                            No measurements recorded. Visit us for a fitting.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
