import React from 'react';

const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-heading font-bold mb-6">Privacy Policy</h1>
    <div className="prose max-w-none space-y-4 text-gray-600">
      <p>At Pandit Ji, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
      <h2 className="text-xl font-bold text-darkbrown mt-6">Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Name, email address, phone number, and shipping address</li>
        <li>Order history and preferences</li>
        <li>Payment information (processed securely by Razorpay — we never see your full card details)</li>
        <li>Device information and browsing behavior on our website</li>
      </ul>
      <h2 className="text-xl font-bold text-darkbrown mt-6">How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>To process and deliver your orders</li>
        <li>To communicate about your orders and provide customer support</li>
        <li>To send promotional offers (only with your consent)</li>
        <li>To improve our website and services</li>
      </ul>
      <h2 className="text-xl font-bold text-darkbrown mt-6">Data Protection</h2>
      <p>We implement industry-standard security measures to protect your data. Your password is hashed and never stored in plain text. Payment data is handled entirely by Razorpay's secure infrastructure.</p>
      <h2 className="text-xl font-bold text-darkbrown mt-6">Your Rights</h2>
      <p>You can request access to, correction of, or deletion of your personal data at any time by contacting us. You can also unsubscribe from marketing emails at any time.</p>
      <p className="mt-6 text-sm">Last updated: January 2025</p>
    </div>
  </div>
);

export default PrivacyPolicy;
