'use client';

import React, { useState } from 'react';
import { Status } from '@/app/constants/backend';

const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    start: 0,
    end: undefined,
    status: Status.APPROVED,
    stateIds: [],
    photos: [],
    central: false,
    localIds: [],
    ministryId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (type === 'select-multiple') {
      const options = (e.target as HTMLSelectElement).selectedOptions;
      const selectedValues = Array.from(options).map((option) => option.value);
      setFormData({
        ...formData,
        [name]: selectedValues,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).getTime();
    setFormData({
      ...formData,
      [e.target.name]: date,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newPhotos = [...formData.photos];
      newPhotos[index] = { ...newPhotos[index], photo: files[0] };
      setFormData({
        ...formData,
        photos: newPhotos,
      });
    }
  };

  const handlePhotoDescChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = { ...newPhotos[index], desc: e.target.value };
    setFormData({
      ...formData,
      photos: newPhotos,
    });
  };

  const addPhotoField = () => {
    setFormData({
      ...formData,
      photos: [...formData.photos, { photo: new File([], ''), desc: '' }],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <label className="block font-medium">Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" />
      
      <label className="block font-medium">Description</label>
      <textarea name="desc" value={formData.desc} onChange={handleChange} className="w-full p-2 border rounded-md" />
      
      <label className="block font-medium">Start Date</label>
      <input type="date" name="start" onChange={handleDateChange} className="w-full p-2 border rounded-md" />
      
      <label className="block font-medium">End Date</label>
      <input type="date" name="end" onChange={handleDateChange} className="w-full p-2 border rounded-md" />
      
      <label className="block font-medium">Status</label>
      <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md">
        {Object.values(Status).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      
      <label className="block font-medium">State IDs</label>
      <select name="stateIds" multiple value={formData.stateIds} onChange={handleChange} className="w-full p-2 border rounded-md">
        <option value="State1">State 1</option>
        <option value="State2">State 2</option>
        <option value="State3">State 3</option>
      </select>
      
      <label className="block font-medium">Central</label>
      <input type="checkbox" name="central" checked={formData.central} onChange={handleChange} className="ml-2" />
      
      <label className="block font-medium">Local IDs</label>
      <select name="localIds" multiple value={formData.localIds} onChange={handleChange} className="w-full p-2 border rounded-md">
        <option value="Local1">Local 1</option>
        <option value="Local2">Local 2</option>
        <option value="Local3">Local 3</option>
      </select>
      
      <label className="block font-medium">Ministry ID</label>
      <input type="text" name="ministryId" value={formData.ministryId} onChange={handleChange} className="w-full p-2 border rounded-md" />
      
      <label className="block font-medium">Photos</label>
      {formData.photos.map((photo, index) => (
        <div key={index} className="space-y-2">
          <input type="file" onChange={(e) => handleFileChange(e, index)} className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="Photo Description" value={photo.desc} onChange={(e) => handlePhotoDescChange(e, index)} className="w-full p-2 border rounded-md" />
        </div>
      ))}
      <button type="button" onClick={addPhotoField} className="w-full p-2 bg-blue-500 text-white rounded-md">Add Photo</button>
      
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-md">Submit</button>
    </form>
  );
};

export default ProjectForm;
