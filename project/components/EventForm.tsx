import { useState } from 'react';
import { Event } from '@/types/event';

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id' | 'source'>) => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    type: '',
    link: '',
    description: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = 'Required';
      }
    });

    if (formData.date && new Date(formData.date) <= new Date()) {
      newErrors.date = 'Must be a future date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        date: '',
        location: '',
        type: '',
        link: '',
        description: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-600 mb-2">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-minimal"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm text-gray-600 mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-minimal"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm text-gray-600 mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-minimal"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm text-gray-600 mb-2">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-minimal"
          >
            <option value="">Select type</option>
            <option value="hackathon">Hackathon</option>
            <option value="workshop">Workshop</option>
            <option value="talk">Talk</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

        <div>
          <label htmlFor="link" className="block text-sm text-gray-600 mb-2">Event Link</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="input-minimal"
          />
          {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm text-gray-600 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-minimal resize-none"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-minimal"
        >
          Create Event
        </button>
      </div>
    </form>
  );
}