'use client';

import React, { useState } from 'react';

const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    amount: '',
    projectId: '',
    schemeId: '',
    incomeId: '',
    ministryId: '',
    central: false,
    stateId: '',
    photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      amount: formData.amount.toString(),
    };
    console.log('Form Data:', dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4 bg-white shadow-md rounded-lg">
      <label className="block">Photo</label>
      <input type="file" onChange={handleFileChange} className="input w-full border p-2 rounded" />

      <label className="block">Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Description</label>
      <textarea name="desc" value={formData.desc} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Amount</label>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Project ID</label>
      <input type="text" name="projectId" value={formData.projectId} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Scheme ID</label>
      <input type="text" name="schemeId" value={formData.schemeId} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Income ID</label>
      <input type="text" name="incomeId" value={formData.incomeId} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Ministry ID</label>
      <input type="text" name="ministryId" value={formData.ministryId} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block flex items-center space-x-2">
        <input type="checkbox" name="central" checked={formData.central} onChange={handleChange} />
        <span>Central</span>
      </label>

      <label className="block">State ID</label>
      <input type="text" name="stateId" value={formData.stateId} onChange={handleChange} className="input w-full border p-2 rounded" />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default ProjectForm;
