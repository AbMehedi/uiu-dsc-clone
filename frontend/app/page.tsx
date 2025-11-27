'use client';

import { useEffect, useState } from 'react';
import { api, Event, About } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BookOpen, Briefcase, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { EventCard } from '@/components/EventCard';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SkeletonEventCard } from '@/components/Skeleton';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, aboutRes] = await Promise.all([
          api.getUpcomingEvents(),
          api.getAbout(),
        ]);
        setEvents(eventsRes.data || []);
        setAbout(aboutRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen page-transition">
      {/* Registration Banner */}
      <section className="bg-green-600 text-white py-3 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">🎉 Fall 2025 Recruitment Now Open!</span>
              <Button size="sm" variant="secondary" className="ml-4 bg-white text-green-600 hover:bg-gray-100">
                Register Now
              </Button>
            </div>
            <div className="text-sm">
              Opens November 18, 2025 • Closes November 19, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 gradient-bg text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-6 animate-float">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              UIU Data Science Club
            </h1>
            </div>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-50 animate-slide-up">
              Empowering students with data science skills, fostering innovation, and building a community of future data leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-blue-50 hover:shadow-glow" asChild>
                <Link href="#events">Events</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 hover:shadow-glow" asChild>
                <Link href="#team">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Official Partnership Section */}
      <section className="py-12 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card flex items-start gap-4 rounded-2xl p-6 border border-white/20">
              <div className="flex-shrink-0">
                <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                  Just Announced
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Official Partnership</h2>
                <h3 className="text-xl font-semibold mb-3">DataCamp Donates Partnership</h3>
                <p className="mb-4 text-blue-50">
                  Get a FREE 1-year DataCamp subscription with 350+ courses on Python, SQL, R, and Machine Learning. Boost your data science skills!
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">Exclusive for club members</span>
                </div>
                <Button variant="secondary" size="sm" asChild>
                  <a href="#" className="flex items-center gap-2">
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Club Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              About Our Club
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              The UIU Data Science Club is dedicated to promoting data science education, research, and applications among students at United International University.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass-card border-2 border-blue-200/50">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="font-heading">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Join a vibrant community of data enthusiasts, share knowledge, and collaborate on exciting projects.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-card border-2 border-green-200/50">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="font-heading">Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Access workshops, seminars, and hands-on training sessions led by industry experts and faculty members.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-card border-2 border-purple-200/50">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="font-heading">Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Participate in competitions, hackathons, and research projects to enhance your skills and portfolio.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Upcoming Events
            </h2>
            <p className="text-center text-gray-700 mb-12">
              Join us for our exciting events and activities throughout the semester.
            </p>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonEventCard key={i} />
                ))}
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">No Upcoming Events</h3>
                <p className="text-gray-700 mb-6">
                  We're currently planning our next batch of exciting events. Check back soon or follow us on social media for announcements!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="#events">View Past Events</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      Follow Updates
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-6">
                  Want to suggest an event? Contact our team at{' '}
                  <a href="mailto:club@datascience.uiu.ac.bd" className="text-blue-600 hover:underline">
                    club@datascience.uiu.ac.bd
                  </a>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}

            {events.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="#events">View All Events</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Join Our Club Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 animate-fade-in">
              Join Our Club Today
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-50 animate-slide-up">
              Become a part of UIU Data Science Club and embark on an exciting journey into the world of data science.
            </p>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-blue-50 hover:shadow-glow-lg animate-slide-up-delay" asChild>
              <Link href="#register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-700">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
