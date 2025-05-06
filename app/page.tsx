'use client';

import { Event } from '@/types/event';
import EventList from '@/components/EventList';
import FilterBar from '@/components/FilterBar';
import EventForm from '@/components/EventForm';
import { useState, useEffect } from 'react';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    handleFilter({});
  }, []);

  const handleFilter = async (filters: { date?: string; type?: string; location?: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters.date) params.append('date', filters.date);
      if (filters.type) params.append('type', filters.type);
      if (filters.location) params.append('location', filters.location);

      const response = await fetch(`/api/events?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (eventData: Omit<Event, 'id' | 'source'>) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      setShowForm(false);
      handleFilter({});
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-24">
        <header className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl">Tech Events</h1>
          <p className="text-gray-600 text-lg">Discover and share technology events worldwide</p>
        </header>

        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl">Events</h2>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="btn-minimal"
            >
              {showForm ? 'Close' : 'Add Event'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl p-8">
              <EventForm onSubmit={handleSubmit} />
            </div>
          )}

          <FilterBar onFilter={handleFilter} />

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading events...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            <EventList events={events} />
          )}
        </div>
      </div>
    </main>
  );
}