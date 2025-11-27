'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Contact } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AdminLayout } from '@/components/AdminLayout';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Mail, User, MessageSquare, CheckCircle } from 'lucide-react';

export default function AdminContacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.getContacts();
      setContacts(response.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'new' ? 'read' : currentStatus === 'read' ? 'replied' : 'read';
      await api.updateContactStatus(id, newStatus);
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
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
          <h1 className="text-4xl font-bold">Contact Submissions</h1>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {contacts.map((contact) => (
            <Card key={contact._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {contact.message}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {new Date(contact.submittedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(contact)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {contact.status !== 'replied' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(contact._id, contact.status)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {contact.status === 'new' ? 'Mark as Read' : 'Mark as Replied'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {contacts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No contact submissions yet.</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent onClose={() => setDialogOpen(false)}>
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
              <DialogDescription>
                Full message from {selectedContact?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-base">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Message</p>
                  <p className="text-base whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted At</p>
                  <p className="text-base">{new Date(selectedContact.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <span className={`px-2 py-1 rounded text-xs inline-block ${
                    selectedContact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    selectedContact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedContact.status}
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

