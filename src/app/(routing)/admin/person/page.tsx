'use client';

import React, { useState } from 'react';

const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    area: [],
    position: [],
    photo: null,
    stateIds: [],
    localIds: [],
    schemeIds: [],
    projectIds: [],
    ministryIds: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).files?.[0] || null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData({
      ...formData,
      [name]: selectedValues,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      phone: formData.phone.toString(),
    };
    console.log('Form Data:', dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4 bg-white shadow-md rounded-lg">
      <label className="block">Photo</label>
      <input type="file" name="photo" onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Phone</label>
      <input type="number" name="phone" value={formData.phone} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Address</label>
      <textarea name="address" value={formData.address} onChange={handleChange} className="input w-full border p-2 rounded" />

      <label className="block">Area</label>
      <select multiple name="area" onChange={handleMultiSelectChange} className="input w-full border p-2 rounded">
        <option value="Area1">Area1</option>
        <option value="Area2">Area2</option>
      </select>

      <label className="block">Position</label>
      <select multiple name="position" onChange={handleMultiSelectChange} className="input w-full border p-2 rounded">
        <option value="Position1">Position1</option>
        <option value="Position2">Position2</option>
      </select>

      <label className="block">State IDs</label>
      <select multiple name="stateIds" onChange={handleMultiSelectChange} className="input w-full border p-2 rounded">
        <option value="State1">State1</option>
        <option value="State2">State2</option>
      </select>

      <label className="block">Local IDs</label>
      <select multiple name="localIds" onChange={handleMultiSelectChange} className="input w-full border p-2 rounded">
        <option value="Local1">Local1</option>
        <option value="Local2">Local2</option>
      </select>

      <label className="block">Scheme IDs</label>
      <select multiple name="schemeIds" onChange={handleMultiSelectChange} className="input w-full border p-2 rounded">
        <option value="Scheme1">Scheme1</option>
        <option value="Scheme2">Scheme2</option>
      </select>

      <label className="block">Project IDs</label>
      <select multiple name="projectIds" onChange={handleMultiSelectChange} className="input w-full border p-2 rounded">
        <option value="Project1">Project1</option>
        <option value="Project2">Project2</option>
      </select>

      <label className="block">Ministry IDs</label>
      <select multiple name="ministryIds" onChange={handleMultiSelectChange} className="input w-full border p-2 rounded">
        <option value="Ministry1">Ministry1</option>
        <option value="Ministry2">Ministry2</option>
      </select>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default ProjectForm;
