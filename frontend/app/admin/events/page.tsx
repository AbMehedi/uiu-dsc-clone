'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Event } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AdminLayout } from '@/components/AdminLayout';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react';

export default function AdminEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    registrationLink: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.getEvents();
      setEvents(response.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date.split('T')[0],
        time: event.time,
        location: event.location,
        imageUrl: event.imageUrl || '',
        registrationLink: event.registrationLink || '',
        status: event.status,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        imageUrl: '',
        registrationLink: '',
        status: 'upcoming',
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await api.updateEvent(editingEvent._id, formData);
      } else {
        await api.createEvent(formData);
      }
      setDialogOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Events Management</h1>
        </div>

        <div className="mb-6">
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <Card key={event._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(event._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No events found. Create your first event!</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent onClose={() => setDialogOpen(false)}>
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
              <DialogDescription>
                {editingEvent ? 'Update event details' : 'Fill in the details to create a new event'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationLink">Registration Link (optional)</Label>
                <Input
                  id="registrationLink"
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

