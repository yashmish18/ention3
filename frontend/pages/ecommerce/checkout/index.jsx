import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaCreditCard, FaBoxOpen, FaMoneyBillWave, FaMobileAlt, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

export default function CheckoutPage() {
  // Only keep these at the top:
  const savedAddresses = [];
  const paymentMethods = [];
  const product = {};
  const deliveryDate = '';
  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [paymentMode, setPaymentMode] = useState('card');
  const [upiMethod, setUpiMethod] = useState('id'); // 'id' or 'qr'
  const [selectedUpiApp, setSelectedUpiApp] = useState('googlepay');
  // Remove these duplicate declarations:
  // const paymentMethods = [...];
  // const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  // const deliveryDate = 'Monday, 10 June 2024';
  // const product = {...};
  // const subtotal = product.price * product.quantity;
  // const shipping = 0;
  // const total = subtotal + shipping;

  // Stepper labels
  const steps = [
    'Shipping address',
    'Payment details',
    'Review your order',
  ];

  const upiApps = [
    { id: 'googlepay', name: 'Google Pay', icon: '/assets/favicon.png' },
    { id: 'phonepe', name: 'PhonePe', icon: '/assets/bot.png' },
    { id: 'paytm', name: 'Paytm', icon: '/assets/ention-logo.png' },
    { id: 'bhim', name: 'BHIM', icon: '/assets/vercel.svg' },
  ];

  // Render step content
  function renderStepContent() {
    if (step === 1) {
      return (
        <div className="w-full">
          {savedAddresses.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Saved addresses</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-2"
                value={useSavedAddress ? selectedAddressId : ''}
                onChange={e => {
                  setUseSavedAddress(true);
                  setSelectedAddressId(Number(e.target.value));
                }}
              >
                {savedAddresses.map(addr => (
                  <option key={addr.id} value={addr.id}>
                    {addr.label}: {addr.line1}, {addr.city}
                  </option>
                ))}
                <option value="">Add new address</option>
              </select>
              <button
                type="button"
                className="text-cyan-600 underline text-xs font-medium hover:text-cyan-800"
                onClick={() => { setUseSavedAddress(false); setSelectedAddressId(null); }}
              >
                + Add new address
              </button>
            </div>
          )}
          {(!useSavedAddress || savedAddresses.length === 0) && (
            <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Snow" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address line 1 *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Street name and number" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address line 2</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Apartment, suite, unit, etc. (optional)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="New York" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="NY" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip / Postal code *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="12345" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="United States" />
              </div>
              <div className="md:col-span-2 flex items-center mt-2">
                <input type="checkbox" className="mr-2" id="useForPayment" />
                <label htmlFor="useForPayment" className="text-sm text-gray-700">Use this address for payment details</label>
              </div>
            </form>
          )}
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="w-full flex flex-col gap-8">
          <div className="text-lg font-semibold text-gray-700 mb-4">Select payment method</div>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="paymentMode" value="card" checked={paymentMode === 'card'} onChange={() => setPaymentMode('card')} className="accent-cyan-600" />
              <span className="font-medium text-gray-800">Credit/Debit Card</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="paymentMode" value="upi" checked={paymentMode === 'upi'} onChange={() => setPaymentMode('upi')} className="accent-cyan-600" />
              <span className="font-medium text-gray-800">UPI</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="paymentMode" value="cod" checked={paymentMode === 'cod'} onChange={() => setPaymentMode('cod')} className="accent-cyan-600" />
              <span className="font-medium text-gray-800">Cash on Delivery</span>
            </label>
          </div>
          {paymentMode === 'card' && (
            <div className="flex flex-col gap-4 mt-4">
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Card number" />
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Name on card" />
              <div className="flex gap-4">
                <input type="text" className="w-1/2 border border-gray-300 rounded-lg px-4 py-3" placeholder="MM/YY" />
                <input type="text" className="w-1/2 border border-gray-300 rounded-lg px-4 py-3" placeholder="CVC" />
              </div>
            </div>
          )}
          {paymentMode === 'upi' && (
            <div className="flex flex-col gap-4 mt-4">
              <div className="w-full flex flex-wrap justify-center gap-6 mb-2">
                {upiApps.map(app => (
                  <label key={app.id} className={`flex flex-col items-center cursor-pointer px-2 py-1 rounded-lg border-2 transition-all ${selectedUpiApp === app.id ? 'border-cyan-500 bg-cyan-100' : 'border-transparent'}`}
                    onClick={() => setSelectedUpiApp(app.id)}
                  >
                    <input
                      type="radio"
                      name="upiApp"
                      value={app.id}
                      checked={selectedUpiApp === app.id}
                      onChange={() => setSelectedUpiApp(app.id)}
                      className="hidden"
                    />
                    <img src={app.icon} alt={app.name} className="w-10 h-10 mb-1" />
                    <span className="text-xs font-medium text-gray-800">{app.name}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-6 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="upiMethod"
                    value="id"
                    checked={upiMethod === 'id'}
                    onChange={() => setUpiMethod('id')}
                    className="accent-cyan-600"
                  />
                  <span className="font-medium text-gray-800">Enter UPI ID</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="upiMethod"
                    value="qr"
                    checked={upiMethod === 'qr'}
                    onChange={() => setUpiMethod('qr')}
                    className="accent-cyan-600"
                  />
                  <span className="font-medium text-gray-800">Scan QR Code</span>
                </label>
              </div>
              {upiMethod === 'id' && (
                <>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Enter your UPI ID" />
                  <div className="text-xs text-gray-500">We'll request payment via your UPI app after you place the order.</div>
                </>
              )}
              {upiMethod === 'qr' && (
                <div className="flex flex-col items-center gap-4 bg-cyan-50 rounded-lg p-4">
                  <img src="/assets/qr-placeholder.png" alt="UPI QR Code" className="w-40 h-40 object-contain mb-2" />
                  <div className="text-xs text-gray-700 text-center mb-2">Scan this QR code with your selected UPI app.</div>
                </div>
              )}
            </div>
          )}
          {paymentMode === 'cod' && (
            <div className="mt-4 text-sm text-gray-700 bg-cyan-50 rounded-lg px-4 py-3">
              You will pay in cash when your order is delivered.
            </div>
          )}
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="w-full flex flex-col gap-8">
          <div className="text-lg font-semibold text-gray-700 mb-4">Review your order (placeholder)</div>
          <div className="text-gray-600">Order details and confirmation UI goes here.</div>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {/* Desktop Layout */}
      <main className="hidden md:block min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] pt-32">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl min-h-[70vh] overflow-hidden">
          {/* Left: Stepper and Form (now on the left) */}
          <section className="w-full md:w-3/5 flex flex-col items-start justify-start px-8 py-12">
            <h2 className="text-2xl font-bold text-[#0FAFCA] mb-8">Checkout</h2>
            {/* Stepper */}
            <div className="flex items-center mb-10 w-full">
              {steps.map((label, idx) => (
                <div key={label} className="flex items-center">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full border-2 border-cyan-400 font-bold transition-all ${step === idx + 1 ? 'bg-cyan-400 text-white' : 'bg-white text-cyan-400'}`}>{idx + 1}</div>
                  <span className={`ml-2 font-semibold transition-all ${step === idx + 1 ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
                  {idx < steps.length - 1 && <div className="flex-1 h-0.5 bg-cyan-200 mx-2" />}
                </div>
              ))}
            </div>
            {/* Step Content */}
            {renderStepContent()}
          </section>
          {/* Right: Order Summary (now on the right) */}
          <aside className="w-full md:w-2/5 flex flex-col items-start justify-between px-8 py-12 border-l border-gray-200">
            <div className="w-full">
              {/* Back Arrow */}
              {step > 1 && (
                <button
                  className="mb-6 flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium text-base transition"
                  onClick={() => setStep(step - 1)}
                  type="button"
                >
                  <FaArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              )}
              <div className="mb-10 flex items-center gap-4">
                {/* Removed Sitemark logo and text */}
              </div>
              <div className="mb-10">
                <div className="text-gray-500 text-lg">Total</div>
                <div className="text-5xl font-extrabold text-gray-900 mb-4">$134.98</div>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between w-80 max-w-full group hover:bg-cyan-50 rounded-lg px-2 py-1 transition">
                    <div>
                      <div className="font-semibold text-gray-900">Professional plan</div>
                      <div className="text-xs text-gray-500">Monthly subscription</div>
                    </div>
                    <div className="text-gray-900">$15.00</div>
                  </div>
                  <div className="flex justify-between w-80 max-w-full group hover:bg-cyan-50 rounded-lg px-2 py-1 transition">
                    <div>
                      <div className="font-semibold text-gray-900">Dedicated support</div>
                      <div className="text-xs text-gray-500">Included in the Professional plan</div>
                    </div>
                    <div className="text-green-600 font-semibold">Free</div>
                  </div>
                  <div className="flex justify-between w-80 max-w-full group hover:bg-cyan-50 rounded-lg px-2 py-1 transition">
                    <div>
                      <div className="font-semibold text-gray-900">Hardware</div>
                      <div className="text-xs text-gray-500">Devices needed for development</div>
                    </div>
                    <div className="text-gray-900">$69.99</div>
                  </div>
                  <div className="flex justify-between w-80 max-w-full group hover:bg-cyan-50 rounded-lg px-2 py-1 transition">
                    <div>
                      <div className="font-semibold text-gray-900">Landing page template</div>
                      <div className="text-xs text-gray-500">License</div>
                    </div>
                    <div className="text-gray-900">$49.99</div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-[#0FAFCA] hover:bg-[#007e9e] text-white font-bold py-3 rounded-xl shadow-lg text-lg transition mt-8"
              onClick={() => setStep(step < 3 ? step + 1 : step)}
            >
              {step < 3 ? 'Next' : 'Place Order'}
            </button>
          </aside>
        </div>
      </main>

      {/* Mobile Layout */}
      <main className="block md:hidden min-h-screen w-full bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] p-2 py-36">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl my-6 overflow-hidden flex flex-col px-2">
          {/* Mobile Back Button */}
          {step > 1 && (
            <button
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium text-base transition mt-4 mb-2 ml-1"
              onClick={() => setStep(step - 1)}
              type="button"
            >
              <FaArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          )}
          {/* Mobile Stepper */}
          <div className="flex items-center justify-center gap-2 py-4 bg-white sticky top-0 z-10">
            {steps.map((label, idx) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 border-cyan-400 font-bold text-sm transition-all ${step === idx + 1 ? 'bg-cyan-400 text-white' : 'bg-white text-cyan-400'}`}>{idx + 1}</div>
                <span className={`mt-1 text-xs font-semibold transition-all ${step === idx + 1 ? 'text-gray-900' : 'text-gray-400'}`}>{label.split(' ')[0]}</span>
              </div>
            ))}
          </div>
          {/* Mobile Step Content */}
          <div className="px-1 py-6 flex-1">
            {/* Fix dropdown width in step 1 */}
            {step === 1 ? (
              <div className="w-full max-w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Saved addresses</label>
                <select
                  className="w-full max-w-full border border-gray-300 rounded-lg px-4 py-3 mb-2"
                  value={useSavedAddress ? selectedAddressId : ''}
                  onChange={e => {
                    setUseSavedAddress(true);
                    setSelectedAddressId(Number(e.target.value));
                  }}
                >
                  {savedAddresses.map(addr => (
                    <option key={addr.id} value={addr.id}>
                      {addr.label}: {addr.line1}, {addr.city}
                    </option>
                  ))}
                  <option value="">Add new address</option>
                </select>
                <button
                  type="button"
                  className="text-cyan-600 underline text-xs font-medium hover:text-cyan-800"
                  onClick={() => { setUseSavedAddress(false); setSelectedAddressId(null); }}
                >
                  + Add new address
                </button>
              </div>
            ) : (
              renderStepContent()
            )}
          </div>
          {/* Mobile Order Summary (collapsible) */}
          <details className="bg-cyan-50 px-4 py-3 border-t border-cyan-100" open>
            <summary className="font-semibold text-cyan-700 cursor-pointer text-base">Order Summary</summary>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Professional plan</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Dedicated support</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hardware</span>
                <span>$69.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Landing page template</span>
                <span>$49.99</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>$134.98</span>
              </div>
            </div>
          </details>
          <button
            className="w-full bg-[#0FAFCA] hover:bg-[#007e9e] text-white font-bold py-3 rounded-b-2xl text-lg transition"
            onClick={() => setStep(step < 3 ? step + 1 : step)}
          >
            {step < 3 ? 'Next' : 'Place Order'}
          </button>
        </div>
      </main>
    </>
  );
} 