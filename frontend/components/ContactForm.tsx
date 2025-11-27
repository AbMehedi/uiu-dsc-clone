'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ErrorMessage } from './ErrorMessage';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      await api.submitContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit contact form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <ErrorMessage message={errors.name} />}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <ErrorMessage message={errors.email} />}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              rows={5}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: '' });
              }}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && <ErrorMessage message={errors.message} />}
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="p-4 bg-green-50 text-green-800 rounded-md flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              'Sending...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

