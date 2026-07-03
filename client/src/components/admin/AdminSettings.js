import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [delivery, setDelivery] = useState({ standard: 40, freeAbove: 499, express: 99 });
  const [gst, setGst] = useState({ rate: 5 });

  useEffect(() => {
    API.get('/admin/settings').then(({ data }) => {
      setSettings(data.settings);
      if (data.settings.delivery_charges) setDelivery(data.settings.delivery_charges);
      if (data.settings.gst) setGst({ rate: (data.settings.gst.rate || 0.05) * 100 });
    }).catch(() => {});
  }, []);

  const saveDelivery = async () => {
    try { await API.put('/admin/settings', { key: 'delivery_charges', value: delivery }); toast.success('Delivery settings saved'); } catch { toast.error('Failed'); }
  };

  const saveGst = async () => {
    try { await API.put('/admin/settings', { key: 'gst', value: { rate: gst.rate / 100, label: `GST (${gst.rate}%)` } }); toast.success('GST settings saved'); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Site Settings</h1>
      <div className="space-y-6 max-w-lg">
        <div className="card p-6">
          <h2 className="font-heading font-bold text-lg mb-4">Delivery Charges</h2>
          <div className="space-y-3">
            <div><label className="block text-sm mb-1">Standard Delivery (₹)</label><input type="number" value={delivery.standard} onChange={e => setDelivery({ ...delivery, standard: parseFloat(e.target.value) })} className="input-field" /></div>
            <div><label className="block text-sm mb-1">Free Delivery Above (₹)</label><input type="number" value={delivery.freeAbove} onChange={e => setDelivery({ ...delivery, freeAbove: parseFloat(e.target.value) })} className="input-field" /></div>
            <div><label className="block text-sm mb-1">Express Delivery (₹)</label><input type="number" value={delivery.express} onChange={e => setDelivery({ ...delivery, express: parseFloat(e.target.value) })} className="input-field" /></div>
            <button onClick={saveDelivery} className="btn-primary">Save Delivery Settings</button>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-heading font-bold text-lg mb-4">GST Settings</h2>
          <div><label className="block text-sm mb-1">GST Rate (%)</label><input type="number" value={gst.rate} onChange={e => setGst({ rate: parseFloat(e.target.value) })} className="input-field" /></div>
          <button onClick={saveGst} className="btn-primary mt-3">Save GST Settings</button>
        </div>

        {settings?.site_info && (
          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg mb-4">Site Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Site Name:</strong> {settings.site_info.siteName}</p>
              <p><strong>Tagline:</strong> {settings.site_info.tagline}</p>
              <p><strong>Email:</strong> {settings.site_info.email}</p>
              <p><strong>Phone:</strong> {settings.site_info.phone}</p>
              <p><strong>Address:</strong> {settings.site_info.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
