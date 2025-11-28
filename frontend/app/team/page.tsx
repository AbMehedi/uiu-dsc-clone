'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Facebook, Linkedin, Github, Mail } from 'lucide-react';
import { Footer } from '@/components/Footer';

// Mock Data matching the real site structure
const executives = [
  { name: 'Musfique Ahmed', role: 'President', image: '/team/president.jpg' },
  { name: 'MD Mahidul Islam Mahi', role: 'Vice President', image: '/team/vp.jpg' },
  { name: 'Mushfiqur Rahman', role: 'General Secretary', image: '/team/gs.jpg' },
  { name: 'Faiyaz Rahman', role: 'Treasurer', image: '/team/treasurer.jpg' },
];

const wingHeads = [
  { name: 'Azraf Al Monzim', role: 'IT Wing Head' },
  { name: 'Abu Anas', role: 'Operations & Events Head' },
  { name: 'Farhan Tariq Jamee', role: 'Creative & Content Head' },
  { name: 'Lamyea Tasnim', role: 'PR & Media Head' },
  { name: 'Ahammad Nafiz', role: 'R&D Wing Head' },
];

interface TeamMemberCardProps {
  name: string;
  role: string;
  image?: string;
}

function TeamMemberCard({ name, role, image }: TeamMemberCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary card-lift">
      <CardHeader>
        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden border-2 border-primary/20">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-2xl font-bold">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        <CardDescription className="text-primary font-medium">{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-3 text-gray-500">
          <a href="#" className="hover:text-blue-600"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="hover:text-blue-700"><Linkedin className="w-4 h-4" /></a>
          <a href="#" className="hover:text-gray-900"><Github className="w-4 h-4" /></a>
          <a href="#" className="hover:text-red-500"><Mail className="w-4 h-4" /></a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-20 page-transition bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary/5 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 gradient-text">
            Meet Our Team
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The dedicated minds behind UIU Data Science Club, working together to foster innovation and learning.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {/* Executive Committee */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <span className="h-1 w-8 bg-primary rounded-full"></span>
            Executive Committee
            <span className="h-1 w-8 bg-primary rounded-full"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((member, idx) => (
              <TeamMemberCard key={idx} {...member} />
            ))}
          </div>
        </div>

        {/* Wing Heads */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <span className="h-1 w-8 bg-accent rounded-full"></span>
            Wing Heads
            <span className="h-1 w-8 bg-accent rounded-full"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {wingHeads.map((member, idx) => (
              <TeamMemberCard key={idx} {...member} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}