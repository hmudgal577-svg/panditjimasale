import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Faq = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'Are your spices 100% pure?', a: 'Yes, absolutely. All our spices are 100% pure with no adulteration, artificial colors, or preservatives. We source directly from trusted farmers and test every batch for quality.' },
    { q: 'How long does delivery take?', a: 'We deliver within 3-5 business days across India. Orders are dispatched within 24 hours of placement. Express delivery options are available at checkout.' },
    { q: 'What is your return policy?', a: 'If you are not satisfied with any product, contact us within 7 days of delivery. We will arrange a replacement or full refund — no questions asked.' },
    { q: 'Do you offer free delivery?', a: 'Yes, we offer free delivery on all orders above ₹499. For orders below ₹499, a standard delivery charge of ₹40 applies.' },
    { q: 'Are your dry fruits fresh?', a: 'We source our dry fruits directly from the best farms and pack them fresh. We maintain strict inventory control to ensure you always receive the freshest products.' },
    { q: 'How should I store my spices?', a: 'Store spices in airtight containers away from direct sunlight and moisture. For best flavor, use within 6 months of purchase. Ground spices stay fresh for 3-4 months.' },
    { q: 'Do you ship internationally?', a: 'Currently, we ship across India only. We are working on international shipping and will announce it soon.' },
    { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 2 hours of placement or before dispatch (whichever is earlier). Once shipped, orders cannot be cancelled.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major payment methods including Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, and Wallets via Razorpay.' },
    { q: 'Is my payment information secure?', a: 'All payments are processed through Razorpay, a PCI-DSS compliant payment gateway. We never store your card or payment details on our servers.' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-center mb-2">Frequently Asked Questions</h1>
      <p className="text-center text-gray-500 mb-8">Everything you need to know about Pandit Ji</p>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="card overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-medium">
              {faq.q}
              <FiChevronDown className={`transition-transform ${open === i ? 'rotate-180' : ''} text-maroon`} />
            </button>
            {open === i && <div className="px-4 pb-4 text-gray-600 text-sm animate-slide-up">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
