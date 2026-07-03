import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { toast.success('Message sent! We will get back to you.'); setForm({ name: '', email: '', subject: '', message: '' }); }
      else toast.error(data.message);
    } catch { toast.error('Failed to send message'); }
    setSending(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-center mb-2">Contact Us</h1>
      <p className="text-center text-gray-500 mb-8">We'd love to hear from you. Get in touch with us.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" required />
            <input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" required />
            <input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" />
            <textarea placeholder="Your Message" rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-field" required />
            <button type="submit" disabled={sending} className="btn-primary w-full">{sending ? 'Sending...' : 'Send Message'}</button>
          </form>
        </div>
        <div className="space-y-4">
          {[
            { icon: <FiMapPin size={24} />, title: 'Address', detail: 'Birla Nagar, Gwalior\nMadhya Pradesh - 474004' },
            { icon: <FiPhone size={24} />, title: 'Phone / WhatsApp', detail: '+91 7415992703\nMon-Sun: 9 AM - 9 PM' },
            { icon: <FiMail size={24} />, title: 'Email', detail: 'hmudgal577@gmail.com\nsupport@panditjimasale.com' },
            { icon: <FiClock size={24} />, title: 'Business Hours', detail: 'Monday - Sunday: 9:00 AM - 9:00 PM\nOpen All Days' },
          ].map((item, i) => (
            <div key={i} className="card p-4 flex items-start space-x-4">
              <div className="text-maroon">{item.icon}</div>
              <div><h3 className="font-semibold text-darkbrown">{item.title}</h3><p className="text-sm text-gray-500 whitespace-pre-line">{item.detail}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
