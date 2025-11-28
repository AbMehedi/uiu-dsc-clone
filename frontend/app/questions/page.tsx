'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, FileText, Download } from 'lucide-react';
import { Footer } from '@/components/Footer';

const courses = [
  { code: 'DS 1101', title: 'Elements of Data Science', type: 'Departmental' },
  { code: 'CSE 2215', title: 'Data Structures & Algorithms', type: 'Departmental' },
  { code: 'MATH 2205', title: 'Linear Algebra', type: 'Non-Departmental' },
  { code: 'DS 3101', title: 'Machine Learning', type: 'Departmental' },
];

export default function QuestionsBank() {
  return (
    <div className="min-h-screen pt-20 page-transition bg-gray-50">
      <section className="bg-primary/5 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gray-900">
            Questions Bank
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access previous exam questions, notes, and practice materials to prepare for your assessments.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.code} className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{course.code}</CardTitle>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {course.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-medium mb-4 text-gray-700">{course.title}</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                    <a href="#">
                      <span className="flex items-center gap-2"><FileText className="w-3 h-3" /> Mid Term</span>
                      <Download className="w-3 h-3" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                    <a href="#">
                      <span className="flex items-center gap-2"><FileText className="w-3 h-3" /> Final Exam</span>
                      <Download className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}