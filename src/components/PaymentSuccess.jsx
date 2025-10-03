import React from 'react';

export default function PaymentSuccess({ orderTotal, itemCount, onClose }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
            <div className="mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Thank you for your purchase</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Items:</span>
                        <span className="font-medium">{itemCount}</span>
                    </div>
                    <div className="border-t pt-2">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Amount:</span>
                            <span className="text-green-600">₨ {orderTotal}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                    <strong>Your order has been processed successfully!</strong><br/>
                    You will receive a confirmation email shortly.
                </p>
            </div>

            <div className="space-y-3">
                <button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                    Continue Shopping
                </button>
                
                <button
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                    View Order Details
                </button>
            </div>

            <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-gray-500">
                    Need help? Contact our support team
                </p>
            </div>
        </div>
    );
}
