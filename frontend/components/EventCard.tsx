'use client';

import { Event } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      {event.imageUrl && (
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
              {event.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {event.description}
            </CardDescription>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {formattedDate}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
                    {event.registrationLink && (
                      <Button className="w-full group/btn" asChild>
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Register Now
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-all duration-300" />
                        </a>
                      </Button>
                    )}
        <div className="mt-3">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              event.status === 'upcoming'
                ? 'bg-blue-100 text-blue-800'
                : event.status === 'ongoing'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {event.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

