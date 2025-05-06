import { useState } from 'react';

interface FilterBarProps {
  onFilter: (filters: FilterValues) => void;
}

interface FilterValues {
  date?: string;
  type?: string;
  location?: string;
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterValues>({});

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <label htmlFor="date" className="block text-sm text-gray-600 mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="input-minimal"
          onChange={(e) => handleFilterChange('date', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm text-gray-600 mb-2">
          Type
        </label>
        <select
          id="type"
          className="input-minimal"
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="hackathon">Hackathon</option>
          <option value="workshop">Workshop</option>
          <option value="talk">Talk</option>
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm text-gray-600 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="input-minimal"
          onChange={(e) => handleFilterChange('location', e.target.value)}
          placeholder="Enter location..."
        />
      </div>
    </div>
  );
}