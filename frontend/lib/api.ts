const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  registrationLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface About {
  _id: string;
  sections: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  mission: string;
  vision: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface Admin {
  _id: string;
  email: string;
  name: string;
  role: string;
}

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Events API
  async getEvents(): Promise<{ success: boolean; data: Event[] }> {
    return this.request('/events');
  }

  async getUpcomingEvents(): Promise<{ success: boolean; data: Event[] }> {
    return this.request('/events/upcoming');
  }

  async getEvent(id: string): Promise<{ success: boolean; data: Event }> {
    return this.request(`/events/${id}`);
  }

  async createEvent(data: Partial<Event>): Promise<{ success: boolean; data: Event }> {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id: string, data: Partial<Event>): Promise<{ success: boolean; data: Event }> {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // About API
  async getAbout(): Promise<{ success: boolean; data: About }> {
    return this.request('/about');
  }

  async updateAbout(data: Partial<About>): Promise<{ success: boolean; data: About }> {
    return this.request('/about', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Contact API
  async submitContact(data: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string; data: Contact }> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContacts(): Promise<{ success: boolean; data: Contact[] }> {
    return this.request('/contact');
  }

  async updateContactStatus(id: string, status: 'new' | 'read' | 'replied'): Promise<{ success: boolean; data: Contact }> {
    return this.request(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Auth API
  async login(email: string, password: string): Promise<{ success: boolean; token: string; data: Admin }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getMe(): Promise<{ success: boolean; data: Admin }> {
    return this.request('/auth/me');
  }
}

export const api = new ApiClient(API_URL);

