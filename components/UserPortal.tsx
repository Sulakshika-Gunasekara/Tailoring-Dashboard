import React, { useState } from 'react';
import { MOCK_ORDERS, MOCK_CURRENT_USER_ID } from '../constants';
import { Order, OrderStatus } from '../types';
import { Clock, Star, MessageSquare, AlertCircle, CheckCircle, Calendar, RefreshCcw } from 'lucide-react';

export const UserPortal: React.FC = () => {
  // Local state to simulate database updates since we are using mocks
  const [orders, setOrders] = useState<Order[]>(
    MOCK_ORDERS.filter(o => o.clientId === MOCK_CURRENT_USER_ID)
  );

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Helper to update an order in local state
  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...updates } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  return (
    <div className="flex h-full gap-6">
        {/* Order List */}
        <div className="w-1/3 bg-gray-50 rounded-2xl p-4 overflow-y-auto border border-gray-100">
            <h3 className="text-lg font-bold mb-4 px-2">Your Orders</h3>
            <div className="space-y-3">
                {orders.map(order => (
                    <div
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedOrder?.id === order.id ? 'bg-white border-black shadow-md' : 'bg-white border-transparent hover:border-gray-200 shadow-sm'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{order.garmentType}</h4>
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{order.fabric}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock size={12} />
                            <span>Due: {new Date(order.dueDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Order Details */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-8 overflow-y-auto">
            {selectedOrder ? (
                <OrderDetailView
                    order={selectedOrder}
                    onUpdate={(updates) => updateOrder(selectedOrder.id, updates)}
                />
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare size={24} />
                    </div>
                    <p>Select an order to view details</p>
                </div>
            )}
        </div>
    </div>
  );
};

const OrderDetailView: React.FC<{ order: Order; onUpdate: (updates: Partial<Order>) => void }> = ({ order, onUpdate }) => {

    // Derived state
    const progress = getProgress(order.status);
    const canRate = order.status === OrderStatus.DELIVERED || order.status === OrderStatus.READY;
    const isPaused = order.changeRequestStatus && order.changeRequestStatus !== 'Resolved';

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{order.garmentType}</h2>
                    <p className="text-gray-500">Order #{order.id}</p>
                </div>
                {isPaused && (
                    <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-amber-100">
                        <AlertCircle size={16} />
                        <span>Change Request Pending</span>
                    </div>
                )}
            </div>

            {/* Status Progress */}
            <div className="mb-10">
                <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    <span>New</span>
                    <span>Fitting</span>
                    <span>Ready</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div className="bg-black h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-center text-sm font-medium text-gray-700">Current Status: {order.status}</p>
            </div>

            {/* Modules based on state */}
            <div className="space-y-6">

                {/* 1. Fit-On Selection */}
                {(order.status === OrderStatus.FIRST_FIT || order.status === OrderStatus.ADJUSTMENTS) && order.suggestedFitSlots && !order.selectedFitSlot && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="text-blue-600" size={20} />
                            <h3 className="font-semibold text-blue-900">Schedule Your Fitting</h3>
                        </div>
                        <p className="text-sm text-blue-700 mb-4">Your tailor has proposed the following times. Please select one.</p>
                        <div className="grid grid-cols-2 gap-3">
                            {order.suggestedFitSlots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => onUpdate({ selectedFitSlot: slot })}
                                    className="bg-white hover:bg-blue-600 hover:text-white text-blue-800 py-3 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm border border-blue-100"
                                >
                                    {new Date(slot).toLocaleString()}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {order.selectedFitSlot && (
                     <div className="bg-green-50 border border-green-100 rounded-xl p-6 flex items-center gap-4">
                        <CheckCircle className="text-green-600" size={24} />
                        <div>
                            <h3 className="font-semibold text-green-900">Fitting Scheduled</h3>
                            <p className="text-sm text-green-700">Confirmed for {new Date(order.selectedFitSlot).toLocaleString()}</p>
                        </div>
                    </div>
                )}

                {/* 2. Rating & Feedback */}
                {canRate && !order.rating && (
                     <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    onClick={() => onUpdate({ rating: star })}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    <Star size={24} fill="currentColor" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {order.rating && (
                     <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                        <div className="flex items-center gap-2 text-yellow-500 mb-2">
                             {[...Array(order.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-sm text-gray-600">Thank you for your feedback!</p>
                     </div>
                )}

                {/* 3. Change Request */}
                {!canRate && order.status !== OrderStatus.NEW && (
                    <ChangeRequestModule order={order} onUpdate={onUpdate} />
                )}

            </div>
        </div>
    );
};

const ChangeRequestModule: React.FC<{ order: Order; onUpdate: (updates: Partial<Order>) => void }> = ({ order, onUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [reason, setReason] = useState("");

    if (order.changeRequestStatus) {
        if (order.changeRequestStatus === 'Pending') {
            return (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                    <h3 className="font-semibold text-amber-900 mb-2">Change Request Submitted</h3>
                    <p className="text-sm text-amber-700 mb-2">We have paused your order. A tailor will review your request and suggest appointment times shortly.</p>
                    <p className="text-xs text-amber-600 italic">"{order.changeRequest}"</p>
                </div>
            );
        }

        // Emulate tailor responding with slots (In a real app this comes from backend)
        // For demo, let's say if status is 'Reviewing' (or handled via some other trigger), we show slots.
        // Here we can simulate the "Tailor responded" state if the user clicks a "Demo: Simulate Tailor Response" button,
        // OR we just assume if they requested, we eventually show slots.

        // Let's add a "Simulate Tailor Response" for the prototype flow
        if (order.changeRequestStatus === 'Reviewing' && !order.appointmentSuggestedSlots) {
             return (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                    <h3 className="font-semibold text-amber-900 mb-2">Request Under Review</h3>
                    <p className="text-sm text-amber-700">Tailor is checking the feasibility...</p>
                    <button
                        onClick={() => onUpdate({
                            appointmentSuggestedSlots: [
                                new Date(Date.now() + 86400000).toISOString(),
                                new Date(Date.now() + 172800000).toISOString()
                            ]
                        })}
                        className="mt-4 text-xs bg-amber-200 hover:bg-amber-300 text-amber-800 px-3 py-1 rounded"
                    >
                        (Demo: Tailor Proposes Slots)
                    </button>
                </div>
            );
        }

        if (order.appointmentSuggestedSlots && !order.appointmentSelectedSlot) {
            return (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                    <h3 className="font-semibold text-indigo-900 mb-2">Select Appointment for Changes</h3>
                    <p className="text-sm text-indigo-700 mb-4">Please pick a time to discuss the changes.</p>
                    <div className="grid grid-cols-2 gap-3">
                        {order.appointmentSuggestedSlots.map(slot => (
                            <button
                                key={slot}
                                onClick={() => onUpdate({
                                    appointmentSelectedSlot: slot,
                                    changeRequestStatus: 'Scheduled'
                                })}
                                className="bg-white hover:bg-indigo-600 hover:text-white text-indigo-800 py-3 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm border border-indigo-100"
                            >
                                {new Date(slot).toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (order.changeRequestStatus === 'Scheduled') {
             return (
                 <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex items-center gap-4">
                    <Calendar className="text-indigo-600" size={24} />
                    <div>
                        <h3 className="font-semibold text-indigo-900">Change Discussion Scheduled</h3>
                        <p className="text-sm text-indigo-700">Confirmed for {new Date(order.appointmentSelectedSlot!).toLocaleString()}</p>
                        <button
                            onClick={() => onUpdate({ changeRequestStatus: 'Resolved', changeRequest: undefined, appointmentSuggestedSlots: undefined, appointmentSelectedSlot: undefined })}
                            className="mt-2 text-xs text-indigo-500 hover:text-indigo-700 underline"
                        >
                            (Demo: Resume Process)
                        </button>
                    </div>
                </div>
             )
        }
    }

    return (
        <div className="border-t border-gray-100 pt-6">
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
                >
                    <RefreshCcw size={16} />
                    <span>Request Changes / Appointment</span>
                </button>
            ) : (
                <div className="bg-gray-50 p-4 rounded-xl animate-fadeIn">
                    <h4 className="font-semibold text-gray-900 mb-2">Request Changes</h4>
                    <p className="text-xs text-gray-500 mb-3">
                        This will pause the production process. You'll need to schedule an appointment with your tailor.
                    </p>
                    <textarea
                        className="w-full p-3 rounded-lg border border-gray-200 text-sm mb-3 focus:outline-none focus:border-black"
                        rows={3}
                        placeholder="Describe what you'd like to change..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                onUpdate({
                                    changeRequest: reason,
                                    changeRequestStatus: 'Reviewing' // Skipping 'Pending' for demo flow speed
                                });
                                setIsExpanded(false);
                            }}
                            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                            disabled={!reason.trim()}
                        >
                            Submit Request
                        </button>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="bg-white text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 border border-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Utilities
const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.NEW: return 'bg-gray-100 text-gray-600';
        case OrderStatus.CUTTING: return 'bg-indigo-100 text-indigo-600';
        case OrderStatus.STITCHING: return 'bg-purple-100 text-purple-600';
        case OrderStatus.FIRST_FIT: return 'bg-blue-100 text-blue-600';
        case OrderStatus.READY: return 'bg-green-100 text-green-600';
        case OrderStatus.DELIVERED: return 'bg-gray-900 text-white';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const getProgress = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.NEW: return 5;
        case OrderStatus.CUTTING: return 20;
        case OrderStatus.STITCHING: return 40;
        case OrderStatus.FIRST_FIT: return 60;
        case OrderStatus.ADJUSTMENTS: return 75;
        case OrderStatus.QC: return 90;
        case OrderStatus.READY: return 95;
        case OrderStatus.DELIVERED: return 100;
        default: return 0;
    }
};
