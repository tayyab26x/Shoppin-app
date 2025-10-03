import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentSuccess from './PaymentSuccess';

const stripePromise = loadStripe('pass_the_published_key_here_from_stripe_account');

const CheckoutForm = ({ cart, total, onSuccess, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [cardValid, setCardValid] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const handleCardChange = (event) => {
        setPaymentError(null);
        
        if (event.complete) {
            setCardComplete(true);
            setValidationMessage('✓ Card looks good!');
        } else {
            setCardComplete(false);
            setValidationMessage('');
        }

        if (event.error) {
            setCardValid(false);
            setValidationMessage(event.error.message);
        } else {
            setCardValid(true);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!cardComplete || !cardValid) {
            setPaymentError('Please enter valid card information.');
            return;
        }

        setLoading(true);
        setPaymentError(null);

        const cardElement = elements.getElement(CardElement);

        try {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            onSuccess();
        } catch (error) {
            console.error('Payment failed:', error);
            setPaymentError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: '"Segoe UI", Roboto, sans-serif',
                fontSmoothing: 'antialiased',
                padding: '16px',
                lineHeight: '24px',
                '::placeholder': {
                    color: '#aab7c4',
                    fontFamily: '"Segoe UI", Roboto, sans-serif',
                },
            },
            invalid: {
                color: '#e74c3c',
                iconColor: '#e74c3c',
            },
            complete: {
                color: '#27ae60',
                iconColor: '#27ae60',
            },
        },
        hidePostalCode: true, // Hide postal code to prevent overlap
        iconStyle: 'solid',
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <button
                onClick={onClose}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
            >
                ✕
            </button>
            
            <h2 className="text-2xl font-bold text-center mb-6">Stripe Checkout</h2>
            
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-4">Order Summary:</h3>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">{item.brand}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold">₨ {item.price * item.quantity}</p>
                        </div>
                    ))}
                    
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total:</span>
                            <span>₨ {total}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Payment Information</h3>
                        
                        
                        <div className={`border rounded-lg p-6 transition-colors ${
                            cardComplete && !cardValid ? 'border-red-300' : 
                            cardComplete && cardValid ? 'border-green-300' : 
                            'border-gray-300'
                        }`}>
                            <CardElement 
                                options={cardElementOptions}
                                onChange={handleCardChange}
                            />
                        </div>
                        
                        {validationMessage && (
                            <p className={`text-sm mt-2 ${
                                cardComplete && cardValid ? 'text-green-600' : 
                                cardComplete && !cardValid ? 'text-red-500' : 
                                'text-gray-500'
                            }`}>
                                {validationMessage}
                            </p>
                        )}
                        
                        {paymentError && (
                            <p className="text-red-500 text-sm mt-2">{paymentError}</p>
                        )}
                        
                        <div className="mt-2 text-xs text-gray-500">
                            {cardComplete && cardValid ? (
                                <span className="text-green-600">✓ Ready to pay!</span>
                            ) : (
                                <span>Complete card information to proceed</span>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !stripe || !cardComplete || !cardValid}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                            loading || !stripe || !cardComplete || !cardValid
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-800 text-white'
                        }`}
                    >
                        {loading ? 'Processing Payment...' : 
                         !cardComplete ? `Complete Card Info` :
                         !cardValid ? `Invalid Card` :
                         `Pay ₨ ${total}`}
                    </button>
                </form>

                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <img
                            src="/vite.svg"
                            alt="Secured by Stripe"
                            className="h-6 mr-2 opacity-50"
                        />
                        <span className="text-sm text-gray-500">Secured by Stripe</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function StripeCheckout({ cart, onClose }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSuccess = () => {
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        onClose();
    };

    if (showSuccess) {
        return (
            <PaymentSuccess 
                orderTotal={total}
                itemCount={cart.length}
                onClose={handleCloseSuccess}
            />
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm 
                cart={cart} 
                total={total} 
                onSuccess={handleSuccess}
                onClose={onClose}
            />
        </Elements>
    );
}
