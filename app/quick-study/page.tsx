import { Suspense } from 'react';
import { QuickStudyComponent } from '@/components/quick-study';

export default function QuickStudyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Quick Study Mode</h1>
      <Suspense fallback={<div>Loading questions...</div>}>
        <QuickStudyComponent />
      </Suspense>
    </div>
  );
}