'use client'; // Mark this component as a Client Component

import React, { useState } from 'react';
import { SchemeInput,Status } from '@/app/constants/backend';


const Scheme: React.FC = () => {
  const [formData, setFormData] = useState<SchemeInput>({
    name: '',
    desc: '',
    central: false,
    stateIds: [],
    start: 0,
    end: undefined,
    status: Status.APPROVED,
    ministryId: '',
    localIds: [],
    photos: [],
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
    // Here you can send the formData to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Central Checkbox */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="central"
            checked={formData.central}
            onChange={handleChange}
            className="mr-2"
          />
          Central
        </label>
      </div>

      {/* State IDs (Multi-Select) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">State IDs</label>
        <select
          name="stateIds"
          multiple
          value={formData.stateIds}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="State1">State 1</option>
          <option value="State2">State 2</option>
          <option value="State3">State 3</option>
        </select>
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="start"
          onChange={handleDateChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* End Date (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          name="end"
          onChange={handleDateChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Status Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {Object.values(Status).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Ministry ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ministry ID</label>
        <input
          type="text"
          name="ministryId"
          value={formData.ministryId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Local IDs (Multi-Select) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Local IDs</label>
        <select
          name="localIds"
          multiple
          value={formData.localIds}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Local1">Local 1</option>
          <option value="Local2">Local 2</option>
          <option value="Local3">Local 3</option>
        </select>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Photos</label>
        {formData.photos.map((photo, index) => (
          <div key={index} className="mt-2 space-y-2">
            <input
              type="file"
              onChange={(e) => handleFileChange(e, index)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <input
              type="text"
              placeholder="Photo Description"
              value={photo.desc}
              onChange={(e) => handlePhotoDescChange(e, index)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addPhotoField}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Photo
        </button>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Scheme;