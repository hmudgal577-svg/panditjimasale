import React from 'react';

const ShippingPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-heading font-bold mb-6">Shipping & Return Policy</h1>
    <div className="prose max-w-none space-y-4 text-gray-600">
      <h2 className="text-xl font-bold text-darkbrown mt-6">Shipping Policy</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Delivery Time:</strong> 3-5 business days across India</li>
        <li><strong>Dispatch:</strong> Within 24 hours of order confirmation</li>
        <li><strong>Free Shipping:</strong> On orders above ₹499</li>
        <li><strong>Standard Delivery:</strong> ₹40 for orders below ₹499</li>
        <li><strong>Express Delivery:</strong> ₹99 (available at checkout, delivery in 1-2 days)</li>
      </ul>
      <p>We currently ship to all pin codes across India. Orders are processed Monday through Saturday (excluding public holidays).</p>

      <h2 className="text-xl font-bold text-darkbrown mt-6">Return & Exchange Policy</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Return Window:</strong> Within 7 days of delivery</li>
        <li><strong>Eligibility:</strong> Products must be unopened and in original packaging</li>
        <li><strong>Damaged/Defective:</strong> We will replace or refund immediately — please share photos</li>
        <li><strong>Refund:</strong> Processed within 5-7 business days after we receive the returned item</li>
        <li><strong>Quality Concern:</strong> If you find any quality issue, contact us for a no-questions-asked replacement</li>
      </ul>
      <p>To initiate a return, please contact our support team at support@panditji.com or call +91-9876543210.</p>
    </div>
  </div>
);

export default ShippingPolicy;
