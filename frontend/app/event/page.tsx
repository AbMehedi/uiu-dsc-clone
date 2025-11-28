'use client';

import { useEffect, useState } from 'react';
import { api, Event } from '@/lib/api';
import { EventCard } from '@/components/EventCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Footer } from '@/components/Footer';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.getEvents();
        setEvents(response.data || []);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen pt-20 page-transition bg-gray-50">
      <section className="bg-primary/5 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gray-900">
            Events Archive
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our upcoming workshops, seminars, and past activities.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}